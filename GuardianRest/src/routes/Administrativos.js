const Router = require('express');
const { obtenerAdministrativos, agregarAdministrativo, administrativoPaginacion, administrativosBusqueda, actualizarAdministrativo, setSchema, obtenerAdministrativo, eliminarAdministrativo } = require('../controllers/administrativo.controller');
const { validateUser } = require('../validation/validation');
const permit = require('../auth/authorize');
const handleError = require('../helpers/error.check');

const router = Router();

//Funcionalidades para el ADMIN y el ADMINISTRATIVO

router.use(permit('admin', 'administrativo'));

router.get('/', handleError(obtenerAdministrativos));

router.get('/paginacion', handleError(administrativoPaginacion));

router.get('/busqueda', handleError(administrativosBusqueda));

router.get('/:id', handleError(obtenerAdministrativo));

//Funcionalidades solo para el ADMIN

router.use(permit('admin'));

router.post('/', validateUser, handleError(agregarAdministrativo));

router.put('/:id', handleError(actualizarAdministrativo));

router.delete('/:id', handleError(eliminarAdministrativo));

module.exports=router;