const rutasUsuario = require("./Medicos");

const rutasEdificios = require('./Edificios');

const rutasUbicaciones = require('./Ubicaciones');

const rutasServicios = require('./Servicios');

const rutasGuardias = require('./Guardias');

const rutasZonas = require('./Zonas');

const rutasLogin = require('./Login');

const rutasAdministrativos = require('./Administrativos');

const rutasPaypal  = require('./Paypal');

const rutasCSV = require('./CSVUploadDownload');

const rutasTiposServicio = require('./TiposServicio');

const rutasEspecialidades = require('./Especialidades');

const rutasAccionesMedicos = require('./AccionesMedico');

const rutasEventualidades = require('./Eventualidades');

const rutasEstadisticas= require('./Estadisticas');

const Router = require('express');

const router = Router();

router.use('/medicos', rutasUsuario);

router.use('/edificios', rutasEdificios);

router.use('/ubicaciones', rutasUbicaciones);

router.use('/servicios', rutasServicios);

router.use('/guardias', rutasGuardias);

router.use('/zonas', rutasZonas);

router.use('/login', rutasLogin);

router.use('/administrativos', rutasAdministrativos);

router.use('/payment', rutasPaypal);

router.use('/CSVUpload', rutasCSV);

router.use('/tiposservicio', rutasTiposServicio);

router.use('/especialidades', rutasEspecialidades);

router.use('/medico', rutasAccionesMedicos);

router.use('/eventualidades', rutasEventualidades);

router.use('/estadisticas', rutasEstadisticas);


module.exports=router;
