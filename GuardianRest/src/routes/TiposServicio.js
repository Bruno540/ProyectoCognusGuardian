const Router = require('express');
const  { obtenerTipos, agregarTipo, obtenerTiposPaginacion, obtenerTiposBusqueda, actualizarTipoServicio, eliminarTipoServicio } = require("../controllers/tipo.servicio.controller");
const permit = require('../auth/authorize');
const handleError = require('../helpers/error.check');
const { validateNombreGenerico, validateUpdateTipoServicio } = require('../validation/validation');

const router = Router();

//Funcionalidades para el ADMIN y el ADMINISTRATIVO

router.use(permit('admin', 'administrativo'));

router.get('/', handleError(obtenerTipos));

router.get('/paginacion', handleError(obtenerTiposPaginacion));

router.get('/busqueda', handleError(obtenerTiposBusqueda));

//Funcionalidad solo para el ADMIN

router.use(permit('admin'));

router.post('/',validateNombreGenerico, handleError(agregarTipo));

router.put('/:id',validateUpdateTipoServicio, handleError(actualizarTipoServicio));

router.delete('/:id', handleError(eliminarTipoServicio));

module.exports=router;
