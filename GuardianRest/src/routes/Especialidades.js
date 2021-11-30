const Router = require('express');

const { obtenerEspecialidades, agregarEspecialidad, eliminarEspecialidad, actualizarEspecialidad, especialidadBusqueda, especialidadPaginacion } = require('../controllers/especialidad.controller');

const permit = require('../auth/authorize');

const handleError = require('../helpers/error.check');

const { validateEspecialidades } = require('../validation/validation');

const router = Router();

//Funcionalidades para el ADMIN y ADMINISTRATIVO

router.get('',permit('admin','administrativo'), handleError(obtenerEspecialidades));

//Funcionalidades solo para el ADMIN

router.use(permit('admin'));

router.post('', validateEspecialidades, handleError(agregarEspecialidad));

router.delete('/:id', handleError(eliminarEspecialidad));

router.put('/:id', handleError(actualizarEspecialidad));

router.get('/busqueda', handleError(especialidadBusqueda));

router.get('/paginacion', handleError(especialidadPaginacion));

module.exports=router;