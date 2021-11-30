const Router = require('express');
const { obtenerZonas, agregarZona, obtenerZonasPaginacion, obtenerZonasBusqueda, actualizarZona, eliminarZona } = require('../controllers/zona.controller');
const handleError = require('../helpers/error.check');
const permit = require('../auth/authorize');
const { validateCreateZona } = require('../validation/validation');

const router = Router();

//Funcionalidades del ADMIN y del ADMINISRATIVO

router.use(permit('admin', 'administrativo'));

router.get('/',  handleError(obtenerZonas));

router.get('/paginacion', handleError(obtenerZonasPaginacion));

router.get('/busqueda',handleError(obtenerZonasBusqueda));

// Funcionalidades solo del ADMIN

router.use(permit('admin'));

router.post('/',validateCreateZona, handleError(agregarZona));

router.put('/:id',validateCreateZona, handleError(actualizarZona));

router.delete('/:id', handleError(eliminarZona));



module.exports=router;