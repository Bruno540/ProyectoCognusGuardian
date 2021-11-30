const Router = require('express');
const  { agregarMedico, obtenerMedicos, obtenerMedico, eliminarMedico, actualizarMedico, medicosPaginacion, medicosBusqueda, obtenerGuardias, asignarGuardia, agregarEspecialidadesMedico, setSchema, quitarEspecialidadMedico } = require("../controllers/medico.controller");
const { validateMedico, validateQuitarEspMedico } = require('../validation/validation');
const permit = require('../auth/authorize');
const handleError = require('../helpers/error.check');

const { upload } = require('../config/multer.config');

const router = Router();


//Funcionalidades para el ADMIN y el ADMINSTRATIVO

router.use(permit('admin', 'administrativo'));

router.get('/', handleError(obtenerMedicos));

router.get('/guardias/:id', handleError(obtenerGuardias));

router.get('/tools/busqueda', handleError(medicosBusqueda));

router.get('/tools/paginacion', handleError(medicosPaginacion));

router.get('/:id', handleError(obtenerMedico));

//Funcionalidades solo para el ADMIN

router.use(permit('admin'));

router.delete('/:id', handleError(eliminarMedico));

router.put('/:id',upload.single("file"), handleError(actualizarMedico));

router.put('/agregarEspecialidades/:id', handleError(agregarEspecialidadesMedico));

router.post('/', upload.single("file"),validateMedico, handleError(agregarMedico));

router.post('/quitarespecialidad',validateQuitarEspMedico, handleError(quitarEspecialidadMedico));

module.exports=router;