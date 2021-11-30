const Router = require('express');

const { obtenerEdificios, agregarEdificio, eliminarEdificio, obtenerServiciosEdificio, obtenerEdificio, actualizarEdificio, edificiosBusqueda, edificiosPaginacion, obtenerUbicacionesDisponibles, obtenerSalasEdificioPaginacion } = require('../controllers/edificio.controller');

const permit = require('../auth/authorize');

const {validateEdificio} = require("../validation/validation");

const handleError = require('../helpers/error.check');

const { upload } = require('../config/multer.config');

const router = Router();

//Funconalidades para el ADMIN, ADMINISTRATIVO y MEDICO

router.use(permit('admin', 'administrativo','medico'));

router.get('/', handleError(obtenerEdificios));

router.get('/ubicaciones/tools/paginacion', handleError(obtenerSalasEdificioPaginacion));

router.get('/paginacion', handleError(edificiosPaginacion));

router.get('/busqueda', handleError(edificiosBusqueda));

router.get('/:id', handleError(obtenerEdificio));

//Funcionalidades para el ADMIN y el ADMINISTRATIVO

router.use(permit('admin', 'administrativo'));

router.get('/ubicaciones/disponibles/:id', handleError(obtenerUbicacionesDisponibles));

router.get('/servicios/:id', handleError(obtenerServiciosEdificio));

//Funcionalidades solo para el ADMIN

router.use(permit('admin'));

router.post('/', upload.single("file"), validateEdificio, handleError(agregarEdificio));

router.delete('/:id', handleError(eliminarEdificio));

router.put('/:id', handleError(actualizarEdificio));

module.exports = router;