const {selectSchema} = require("../database/database");
const ApiError = require("../helpers/api.error");
const UsuarioGeneral = require("../models/UsuarioGeneral");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { enviarEmailSimple } = require('./email.service');

class LoginService {
   
    constructor (schema) {
        this.seq = selectSchema(schema);
    }

    async login(email, password){
        const user = await UsuarioGeneral.scope('password').findOne({
            where:{
                email: email
            }
        });
        if(!user){
            throw ApiError.badRequestError("Credenciales incorrectas");
        }
        const result = await bcrypt.compare(password, user.password);
        if(result) {
            const SECRET_KEY = process.env[`TK_SECRET_${user.tipo}`];
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    institucion: user.institucion
                },
                SECRET_KEY,
                {
                    expiresIn: "1h"
                }
            )
            return {
                message: 'Auth successful',
                token: token,
                role: user.tipo,
                nombre: user.nombre
            };
        }
        else {
            throw ApiError.badRequestError("Credenciales incorrectas");
        }
    }

    async getUsuario(email){
        const usuario = await UsuarioGeneral.findOne({
            where:{
                email
            }
        });
        if(!usuario){
            throw ApiError.badRequestError("Usuario no encontrado");
        }
        return usuario;
    }

    async forgotPassword(email){
        const usuario = await this.getUsuario(email);
        if(!usuario){
            throw ApiError.badRequestError("Usuario no registrado");
        }
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                institucion: usuario.institucion
            },
            process.env[`TK_SECRET_${usuario.tipo}`],
            {
                expiresIn: "30m"
            }
        );
        const link = process.env.FRONTEND_URL+"/component/passwordreset?token=" + token;
        enviarEmailSimple(usuario.email, `Ingrese al siguiente link para restablecer su contraseña: ${link}`)
    }

    async changePassword(token,newPassword, newPasswordVerification){
        if(!token){
            throw ApiError.badRequestError("El token no es valido");
        }
        const decoded = jwt.verify(token, process.env.TK_SECRET_ADMIN);
        const usuario = await this.getUsuario(decoded.email);
        if(newPassword!==newPasswordVerification){
            throw ApiError.badRequestError("Las contraseñas ingresadas no coinciden");
        }
        newPassword = await bcrypt.hash(newPassword, 12);
        this.seq = selectSchema(usuario.institucion);
        const usuarioFind = await this.seq.models.Usuario.findByPk(usuario.id);
        await usuarioFind.update({
            password: newPassword
        });
    }
}

module.exports = LoginService;