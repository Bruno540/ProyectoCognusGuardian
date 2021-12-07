const { check, validationResult } = require('express-validator');
const Institucion = require('../models/Institucion');
const UsuarioGeneral = require('../models/UsuarioGeneral');
const Suscripcion = require('../models/Suscripcion');
const moment = require('moment');
const fs = require("fs");

const phone = /^((09[1-9](\s?)([0-9]{3})(\s?)([0-9]{3}))|((2|4)(\s?)([0-9]{3})(\s?)([0-9]{2})(\s?)([0-9]{2})))$/g;

const responseErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    if(req.file){
      fs.unlink(req.file.path, (err) => {});
    }  
    return res.status(422).json({errors: errors.array()});
  }
  next();
}

exports.validateUser = [
    check('nombre').trim().escape().not().isEmpty().withMessage('El nombre de usuario no puede estar vacio!').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres son requeridos!').bail(),
    check('apellido').trim().escape().not().isEmpty().withMessage('Apellido no puede estar vacio!').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres son requeridos!').bail(),
    check('email').trim().normalizeEmail().not().isEmpty().withMessage('Debe ingresar un email!').isEmail().withMessage('Ingrese una direccion de email valida.').bail().custom(
    async email => {
      const value = await UsuarioGeneral.findOne({where:{email}});
      const value2 = await Suscripcion.findOne({where:{email}});
      if (value || value2) {
          throw new Error('Ya existe el email!!!');
      }
    }
    ).withMessage('Ya existe el email!'),
    check('telefono').trim().escape().not().isEmpty().withMessage('Ingrese un numero de telefono!').bail().isLength({min: 3}).withMessage('Al menos 3 numeros son requeridos!').bail().custom(telefono=>phone.test(telefono)).withMessage("El formato del telefono debe ser como el siguiente: 098000111"),
    responseErrors
  ];

exports.validateMedico = [
  ...this.validateUser,
  check('direccion').trim().escape().not().isEmpty().withMessage('Direccion no puede estar vacia!').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres son requeridos!').bail(),
  check('fecha_nac').trim().escape().not().isEmpty().withMessage('La fecha no puede estar vacia').bail().toDate().withMessage("El formato de la fecha no es correcto").bail().isBefore(new Date().toString()).withMessage('La fecha debe ser menor al dia de hoy').bail().custom(fecha=>{
    var years = moment().diff(fecha, 'years');
    if(years<24){
      throw new Error('El medico debe tener al menos 24 años');
    }
    else{
      return true
    }
  }).withMessage('El medico debe tener al menos 24 años'),
  check('idzona').trim().escape().not().isEmpty().withMessage('Debe indicar una zona de residencia').bail().isNumeric().withMessage("El id de la zona debe ser numerico").bail(),
  responseErrors
]

exports.validateEdificio = [
    check('direccion').trim().escape().not().isEmpty().withMessage('La direccion no puede estar vacia').bail().isLength({min: 3}).withMessage('La direccion debe tener al menos 3 caracteres!').bail(),
    check('nombre').trim().escape().not().isEmpty().withMessage('El nombre no puede estar vacio').bail().isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres!').bail(),
    check('telefono').trim().escape().not().isEmpty().withMessage('El telefono no puede estar vacio').bail().isLength({min: 8}).withMessage('El telefono debe tener al menos 8 numeros!').bail(),
    responseErrors
];

exports.validateGuardia = [
    check('descripcion').trim().escape().not().isEmpty().withMessage('La descripcion no puede estar vacia').bail().isLength({min: 3}).withMessage('Minimum 3 characters required!').bail(),
    check('fechainicio').trim().escape().not().isEmpty().withMessage('La fecha no puede estar vacia').bail().isISO8601().toDate().withMessage("El formato de la fecha no es correcto").bail().isAfter(new Date().toString()).withMessage('La fecha no puede ser menor a la fecha actual').bail(),
    check('idservicio').trim().escape().not().isEmpty().withMessage('El id del servicio no puede estar vacio').isNumeric().withMessage("El id del servicio debe ser numerico").bail(),
    check('duracion').trim().escape().not().isEmpty().withMessage('la duracion no puede estar vacia').isInt({min:1,max:12}).withMessage("La duracion debe ser un numero entre 1 y 12").bail(),
    responseErrors
];

exports.validateUpdateGuardia = [
  check('id').trim().escape().not().isEmpty().withMessage('El id de la guardia no puede estar vacio').isNumeric().withMessage("El id de la guardia debe ser numerico").bail(),
  check('fechainicio').trim().escape().not().isEmpty().withMessage('La fecha no puede estar vacia').bail().toDate().withMessage("El formato de la fecha no es correcto").bail().isAfter(new Date().toString()).withMessage('La fecha de inicio no puede ser menor a la fecha actual').bail(),
  check('fechafin').trim().escape().not().isEmpty().withMessage('La fecha no puede estar vacia').bail().toDate().withMessage("El formato de la fecha no es correcto").bail().isAfter(new Date().toString()).withMessage('La fecha de fin no puede ser menor a la fecha actual').bail(),  
  responseErrors
];

exports.validateSignup = [
  check('nombre').trim().escape().not().isEmpty().withMessage('El nombre de usuario no puede estar vacio!').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres son requeridos!').bail(),
  check('apellido').trim().escape().not().isEmpty().withMessage('El apellido no puede estar vacio!').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres son requeridos!').bail(),
  check('email').trim().normalizeEmail().not().isEmpty().withMessage('Debe ingresar una direccion de email!').isEmail().withMessage('Ingrese una direccion de email valida.').bail().custom(
    async email => {
        const value = await UsuarioGeneral.findOne({where:{email}});
        const value2 = await Suscripcion.findOne({where:{email}});
        if (value || value2) {
            throw new Error('Ya existe ese email en el sistema!!!');
        }
  }
  ).withMessage('Ya existe ese email en el sistema!'),
  check('telefono').trim().escape().not().isEmpty().withMessage('El telefono no puede estar vacio!').bail().isLength({min: 3}).withMessage('Se requieren al menos 3 caracteres!').bail(),
  check('institucion').isAlphanumeric().withMessage('El nombre no puede contener espacios o simbolos, solo letras y numeros').toLowerCase().trim().escape().not().isEmpty().withMessage('Debe ingresar un nombre de institucion!').bail().isLength({min: 3}).withMessage('Minimum 3 characters required!').bail().custom(
    async institucion => {
      const value = await Institucion.findOne({where:{nombre: institucion}});
      if (value || institucion==="public") {
          throw new Error('Ya hay una Institucion registrada con ese nombre!!!');
      }
  }
  ).withMessage('Ya hay una Institucion registrada con ese nombre!'),
  responseErrors
];

exports.validateSuscription = [
  ...this.validateSignup,
  check('id').trim().escape().not().isEmpty().withMessage('El id de la suscripcion no puede ser vacio!'),
]

exports.validateServicioLocal = [
  check('idtipo').trim().escape().not().isEmpty().withMessage('Debe indicar el tipo de servicio').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  check('especialidades').isArray({min:1}).withMessage('Debe indicar al menos una especialidad').bail().custom(
    async especialidades => {
      especialidades.forEach(element => {
        if(!element.cantidad){
          throw new Error('Debe ingresar la cantidad de medicos por especialidad seleccionada');
        }
      });
  }),
  check('idedificio').trim().escape().not().isEmpty().withMessage('Debe indicar el edificio').bail().isNumeric().withMessage("El id del edificio debe ser un numero").bail(),
  check('idubicacion').trim().escape().not().isEmpty().withMessage('Debe indicar la ubicacion').bail().isNumeric().withMessage("El id de la ubicacion debe ser un numero").bail(),
  responseErrors
]

exports.validateServicioDomicilio = [
  check('idzona').trim().escape().not().isEmpty().withMessage('Debe indicar la zona del servicio').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  check('especialidades').isArray({min:1}).withMessage('Debe indicar al menos una especialidad').bail().custom(
    async especialidades => {
      especialidades.forEach(element => {
        if(!element.cantidad){
          throw new Error('Debe ingresar la cantidad de medicos por especialidad seleccionada');
        }
      });
  }),
  responseErrors
]

exports.validatePostularseGuardia = [
  check('idesp').trim().escape().not().isEmpty().withMessage('Debe indicar la especialidad').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  check('idguardia').trim().escape().not().isEmpty().withMessage('Debe indicar la guardia').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  responseErrors
]



exports.validateIdGuardia = [
  check('idguardia').trim().escape().not().isEmpty().withMessage('Debe indicar la guardia').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  responseErrors
]

exports.validateChangePassword = [
  check('password').trim().escape().not().isEmpty().withMessage('La contraseña no puede estar vacia').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  check('newPassword').trim().escape().not().isEmpty().withMessage('La confirmacion de contraseña no puede estar vacia').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  responseErrors
]

exports.validateEspecialidades = [
  check('nombre').trim().escape().not().isEmpty().withMessage('El nombre no puede estar vacio').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  responseErrors
]

exports.validateEventualidad = [
  check('idev').trim().escape().not().isEmpty().withMessage('Debe indicar la eventualidad').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  responseErrors
]

exports.validateAsignMedico = [
  check('idguardia').trim().escape().not().isEmpty().withMessage('Debe indicar la guardia').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  check('idmedicos').isArray({min:1}).withMessage('Debe seleccionar al menos un medico').bail(),
  responseErrors
]

exports.validateLogin = [
  check('email').trim().not().isEmpty().withMessage('Debe ingresar su email').isEmail().withMessage('Ingrese una direccion de email valida').bail(),
  check('password').trim().escape().not().isEmpty().withMessage('Debe ingresar el password').bail(),
  responseErrors
]

exports.validateEmail = [
  check('email').trim().normalizeEmail().not().isEmpty().withMessage('Debe ingresar su email').isEmail().withMessage('Ingrese una direccion de email valida').bail(),
  responseErrors
]

exports.validateQuitarEspMedico = [
  check('idmedico').trim().escape().not().isEmpty().withMessage('Debe indicar el medico').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  check('especialidad').trim().escape().not().isEmpty().withMessage('Debe indicar la especialidad').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  responseErrors
]

exports.validateNombreGenerico = [
  check('nombre').trim().escape().not().isEmpty().withMessage('El nombre no puede estar vacio').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  responseErrors
]

exports.validateUpdateTipoServicio = [
  check('nombre').trim().escape().not().isEmpty().withMessage('El nombre no puede estar vacio').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  check('id').trim().escape().not().isEmpty().withMessage('Debe indicar el servicio').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  responseErrors
]

exports.validateCreateUbicaciones = [
  check('descripcion').trim().escape().not().isEmpty().withMessage('La descripcion no puede estar vacia').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  check('idedificio').trim().escape().not().isEmpty().withMessage('Debe indicar el edificio').bail().isNumeric().withMessage('El id debe ser un numero').bail(),
  responseErrors
]

exports.validateCreateZona = [
  check('pais').trim().escape().not().isEmpty().withMessage('El pais no puede estar vacio').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  check('departamento').trim().escape().not().isEmpty().withMessage('El departamento no puede estar vacio').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  check('localidad').trim().escape().not().isEmpty().withMessage('La localidad no puede estar vacia').bail().isLength({min: 3}).withMessage('Al menos 3 caracteres requeridos!').bail(),
  responseErrors
]


