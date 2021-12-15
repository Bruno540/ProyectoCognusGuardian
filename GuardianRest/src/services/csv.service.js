const {selectSchema} = require("../database/database");
const fs = require('fs');
const csv = require('fast-csv');
const ApiError = require("../helpers/api.error");
const UsuarioGeneral = require("../models/UsuarioGeneral");
const moment = require('moment');


class CsvService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Administrativo = this.seq.models.Administrativo;
        this.Medico = this.seq.models.Medico;
        this.Usuario = this.seq.models.Usuario;
        this.Zona = this.seq.models.Zona;
        this.Especialidad = this.seq.models.Especialidad;
        this.Edificio = this.seq.models.Edificio;
        this.TipoServicio = this.seq.models.TipoServicio;
    }

    async uploadFile(file){
        const administrativos = [];
        const usuarios = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(__basedir + "/uploads/" + file.filename)
            .pipe(csv.parse({ headers: ['email', 'nombre','apellido','telefono'], ignoreEmpty:true, strictColumnHandling:true, renameHeaders:true }))
            .validate(async (data, cb) => {
                const user = await UsuarioGeneral.findOne({where:{email:data.email}});
                const fields = (data.email && data.nombre && data.apellido && data.telefono);
                if (user) {
                    return cb(null, false, `El email ${data.email} ya existe`);
                }
                if(!fields){
                    return cb(null, false, `Los datos estan incompletos`);
                }
                return cb(null, true);
            })
            .on('error', error => {
                console.log(error);
                return reject({message:'Error al procesar el archivo, verifique su contenido'});
            })
            .on('data', row => {
                usuarios.push(row); //agregado
                administrativos.push(row);
            })
            .on('data-invalid', (row, rowNumber, reason) => {
                if(reason){
                    return reject({message:reason});
                }
                else{
                     return reject({message:`Revise el formato del archivo, le sugerimos descargar la plantilla`});
                }
            })
            .on('end', async res => {
              if(usuarios.length && administrativos.length){
                    return await this.seq.transaction().then(async t => {
                        return await this.Administrativo.bulkCreate(administrativos, {usuarios, usermodel:this.Usuario, transaction:t}).then(() => {
                            t.commit();
                            fs.unlink(file.path, (err) => {});
                            const result = {
                                status: "ok",
                                filename: file.originalname,
                                message: "Archivo cargado satisfactoriamente!",
                            }
                            return resolve(result);
                        }).catch((err) => {
                            t.rollback();
                            fs.unlink(file.path, (err) => {});
                            const result = {
                                status: "fail",
                                filename: file.originalname,
                                message: "Error al subir el archivo!"
                            }
                            return reject(result);
                    });
                });
            }
            else{
                return reject({message:`No se encontraron datos a insertar`});
            }
        });
    });
    }
    
    async uploadzonaFile(file){
        const zonas = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(__basedir + "/uploads/" + file.filename)
            .pipe(csv.parse({ headers: ['pais','departamento','localidad'], ignoreEmpty:true, strictColumnHandling:true, renameHeaders:true }))
            .validate(async (data, cb) => {
                const fields = (data.pais && data.departamento && data.localidad);
                if(!fields){
                    return cb(null, false, `Los datos estan incompletos`);
                }
                return cb(null, true);
            })
            .on('error', error => {
                return reject({message:'Error al procesar el archivo, verifique su contenido'});
            })
            .on('data', row => {
                zonas.push(row);
            })
            .on('data-invalid', (row, rowNumber, reason) => {
                if(reason){
                    return reject({message:reason});
                }
                else{
                     return reject({message:`Revise el formato del archivo, le sugerimos descargar la plantilla`});
                }
            })
            .on('end', async res => {
                if(zonas.length){
                    return await this.Zona.bulkCreate(zonas).then(() => {
                        const result = {
                            status: "ok",
                            filename: file.originalname,
                            message: "Archivo cargado satisfactoriamente!",
                        }
                        fs.unlink(file.path, (err) => {});
                        return resolve(result);
                    }).catch((err) => {
                        const result = {
                            status: "fail",
                            filename: file.originalname,
                            message: "Error al subir el archivo!"
                        }
                        fs.unlink(file.path, (err) => {});
                        return reject(result);
                    });
                }
                else{
                    return reject({message:`No se encontraron datos a insertar`});
                }
            });
        });
    }
    
    async uploadMedicoFile(file){
            const medicos = [];
            const usuarios = []; //agregado
            return new Promise((resolve, reject) => {
                fs.createReadStream(__basedir + "/uploads/" + file.filename)
                .pipe(csv.parse({ headers: ['email', 'nombre','apellido','telefono','direccion','fecha_nac','idzona'], ignoreEmpty:true, strictColumnHandling:true, renameHeaders:true }))
                .validate(async (data, cb) => {
                    const user = await UsuarioGeneral.findOne({where:{email:data.email}});
                    const fields = (data.email && data.nombre && data.apellido && data.telefono && data.direccion && data.fecha_nac && data.idzona);
                    if (user) {
                        return cb(null, false, `El email ${data.email} ya existe`);
                    }
                    var years = moment().diff(data.fecha_nac, 'years');
                    if(years<24){
                        return cb(null, false, `El medico ${data.email} tiene menos de 24 años`);
                    }
                    const zona = await this.Zona.findByPk(data.idzona);
                    if(!zona){
                        return cb(null, false, `La zona ingresada al medico: ${data.email} no existe`);
                    }
                    if(!fields){
                        return cb(null, false, `Los datos estan incompletos`);
                    }
                    return cb(null, true);
                })
                .on('error', error => {
                    return reject;
                })
                .on('data', row => {
                    usuarios.push(row); //agregado
                    medicos.push(row);
                })
                .on('data-invalid', (row, rowNumber, reason) => {
                    if(reason){
                        return reject({message:reason});
                    }
                    else{
                         return reject({message:`Revise el formato del archivo, le sugerimos descargar la plantilla`});
                    }
                })
                .on('end', async res => {
                    if(usuarios.length && medicos.length){
                        return await this.seq.transaction().then(async t => {
                            const especialidad = await this.Especialidad.findOne({
                                where:{
                                    nombre: 'Medicina General'
                                }
                            });
                            if(!especialidad){
                                return reject({message:"Por favor cargue las especialidades necesarias en el sistema"});
                            }
                            return await this.Medico.bulkCreate(medicos, {usuarios, especialidad, usermodel:this.Usuario, transaction:t}).then(async (creados) => {
                                for(const medico of creados){
                                    await medico.setEspecialidads(especialidad, {transaction: t});
                                }
                                await t.commit();
                                fs.unlink(file.path, (err) => {});
                                const result = {
                                    status: "ok",
                                    filename: file.originalname,
                                    message: "Archivo cargado satisfactoriamente!",
                                }
                                resolve(result);
                            }).catch(async (err) => {
                                await t.rollback();
                                fs.unlink(file.path, (err) => {});
                                const result = {
                                    status: "fail",
                                    filename: file.originalname,
                                    message: "Error al subir el archivo!"
                                }
                                return reject(result);
                        });
                    });
                }
                else{
                    return reject({message:`No se encontraron datos a insertar`});
                }
            });
        });
    }
    
    
    async uploadespecialidadesFile(file){
        const especialidades = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(__basedir + "/uploads/" + file.filename)
            .pipe(csv.parse({ headers: ['nombre'], ignoreEmpty:true, strictColumnHandling:true, renameHeaders:true }))
            .validate(async (data, cb) => {
                const fields = !!(data.nombre);
                if(!fields){
                    return cb(null, false, `Los datos estan incompletos`);
                }
                const esp = await this.Especialidad.findOne({where:{nombre: data.nombre}});
                if(esp){
                    return cb(null, false, `La especialidad ${esp.nombre} ya existe`);
                }
                return cb(null, true);
            })
            .on('error', error => {
                return reject({message:'Error al procesar el archivo, verifique su contenido'});
            })
            .on('data', row => {
                especialidades.push(row);
            })
            .on('data-invalid', (row, rowNumber, reason) => {
                if(reason){
                    return reject({message:reason});
                }
                else{
                     return reject({message:`Revise el formato del archivo, le sugerimos descargar la plantilla`});
                }
            })
            .on('end', async res => {
                if(especialidades.length){
                    return await this.Especialidad.bulkCreate(especialidades).then(() => {
                        const result = {
                            status: "ok",
                            filename: file.originalname,
                            message: "Archivo cargado satisfactoriamente!",
                        }
                        fs.unlink(file.path, (err) => {});
                        return resolve(result);
                    }).catch((err) => {
                        const result = {
                            status: "fail",
                            filename: file.originalname,
                            message: "Error al subir el archivo!"
                        }
                        fs.unlink(file.path, (err) => {});
                        return reject(result);
                    });
                }
                else{
                    return reject({message:`No se encontraron datos a insertar`});
                }
            });
        });
    }
    
    async uploadEdificiosFile(file){
        const edificios = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(__basedir + "/uploads/" + file.filename)
            .pipe(csv.parse({ headers: ['direccion','nombre','telefono'], ignoreEmpty:true, strictColumnHandling:true, renameHeaders:true }))
            .validate(async (data, cb) => {
                const fields = (data.direccion && data.nombre && data.telefono);
                if(!fields){
                    return cb(null, false, `Los datos estan incompletos`);
                }
                return cb(null, true);
            })
            .on('error', error => {
                return reject({message:'Error al procesar el archivo, verifique su contenido'});
            })
            .on('data', row => {
                edificios.push(row);
            })
            .on('data-invalid', (row, rowNumber, reason) => {
                if(reason){
                    return reject({message:reason});
                }
                else{
                     return reject({message:`Revise el formato del archivo, le sugerimos descargar la plantilla`});
                }
            })
            .on('end', async res => {
                if(edificios.length){
                    return await this.Edificio.bulkCreate(edificios).then(() => {
                        const result = {
                            status: "ok",
                            filename: file.originalname,
                            message: "Archivo cargado satisfactoriamente!",
                        }
                        fs.unlink(file.path, (err) => {});
                        return resolve(result);
                    }).catch((err) => {
                        const result = {
                            status: "fail",
                            filename: file.originalname,
                            message: "Error al subir el archivo!"
                        }
                        fs.unlink(file.path, (err) => {});
                        return reject(result);
                    });
                }
                else{
                    return reject({message:`No se encontraron datos a insertar`});
                }
            });
        });
    }
    
    async uploadTiposServicioFile(file){
        const tiposServicio = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(__basedir + "/uploads/" + file.filename)
            .pipe(csv.parse({ headers: ['nombre'], ignoreEmpty:true, strictColumnHandling:true, renameHeaders:true }))
            .validate(async (data, cb) => {
                const fields = !!(data.nombre);
                if(!fields){
                    return cb(null, false, `Los datos estan incompletos`);
                }
                return cb(null, true);
            })
            .on('error', error => {
                return reject({message:'Error al procesar el archivo, verifique su contenido'});
            })
            .on('data', row => {
                tiposServicio.push(row);
            })
            .on('data-invalid', (row, rowNumber, reason) => {
                if(reason){
                    return reject({message:reason});
                }
                else{
                     return reject({message:`Revise el formato del archivo, le sugerimos descargar la plantilla`});
                }
            })
            .on('end', async res => {
                if(tiposServicio.length){
                    return await this.TipoServicio.bulkCreate(tiposServicio).then(() => {
                        const result = {
                            status: "ok",
                            filename: file.originalname,
                            message: "Archivo cargado satisfactoriamente!",
                        }
                        fs.unlink(file.path, (err) => {});
                        return resolve(result);
                    }).catch((err) => {
                        const result = {
                            status: "fail",
                            filename: file.originalname,
                            message: "Error al subir el archivo!"
                        }
                        fs.unlink(file.path, (err) => {});
                        return reject(result);
                    });
                }
                else{
                    return reject({message:`No se encontraron datos a insertar`});
                }
            });
        });
    }
    
    async downloadFile(nombre){
        if(nombre==="Medico"){
            return "/uploads/medicos.csv";
        } 
        if(nombre==="Administrativo"){
            return "/uploads/administrativos.csv";
        }
        if(nombre==="Edificio"){
            return "/uploads/edificios.csv";
        }
        if(nombre==="Especialidad"){
            return "/uploads/especialidades.csv";
        } 
        if(nombre==="TipoServicio"){
            return "/uploads/tiposervicios.csv";
        } 
        if(nombre==="Zona"){
            return "/uploads/zonas.csv";
        } 
        throw ApiError.badRequestError("No tiene acceso a la plantilla solicitada");
    }

}

module.exports = CsvService;