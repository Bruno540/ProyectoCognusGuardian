
const LoginService = require("../services/login.service");

async function login(req, res){
    const { email, password } = req.body;
    const response = await new LoginService().login(email,password);
    return res.json(response);
}

async function forgotPassword(req,res){
    const { email } = req.body;
    await new LoginService().forgotPassword(email)
    res.json({
        message:"Se le ha enviado a su correo un link para restablecer su contraseña"
    });
}

async function changePassword(req,res){
    const { token } = req.params;
    const { newPassword, newPasswordVerification} = req.body;
    await  new LoginService().changePassword(token,newPassword,newPasswordVerification);
    res.json({
        message: "Contraseña restablecida con exito"
    });
}

module.exports={
    login,
    changePassword,
    forgotPassword
}