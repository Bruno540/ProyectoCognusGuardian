const Router = require('express');

const { obtenerUbicaciones, agregarUbicacion, obtenerUbicacion, eliminarUbicacion, actualizarUbicacion, obtenerUbicacionesPaginacion, obtenerUbicacionesBusqueda } = require('../controllers/ubicacion.controller');
const permit = require('../auth/authorize');
const handleError = require('../helpers/error.check');
const { validateCreateUbicaciones } = require('../validation/validation');

const router = Router();

//Funcionalidades para ADMIN y ADMINISTRATIVO

router.use(permit('admin', 'administrativo'))

router.get('/' , handleError(obtenerUbicaciones));

router.get('/:idedificio', handleError(obtenerUbicacion));

router.get('/tools/paginacion', handleError(obtenerUbicacionesPaginacion));

router.get('/tools/busqueda',handleError(obtenerUbicacionesBusqueda));

//Funcionalidades solo para el ADMIN

router.use(permit('admin'))

router.post('/',validateCreateUbicaciones, handleError(agregarUbicacion));

router.put('/:id',validateCreateUbicaciones, handleError(actualizarUbicacion));

router.delete('/:idedificio', handleError(eliminarUbicacion));

module.exports=router;