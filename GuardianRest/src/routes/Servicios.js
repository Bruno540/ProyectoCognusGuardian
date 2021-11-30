const { obtenerServicios, agregarServicioLocal, obtenerServiciosLocales, obtenerServiciosDomicilio, agregarServicioDomicilio, obtenerServiciosZona, servicioLocalPaginacion, obtenerGuardiasServicio, 
    servicioDomicilioPaginacion, servicioLocalBusqueda, servicioLocalGuardiasBusqueda, obtenerGuardiasServicioPaginacion, obtenerServicio, eliminarServicio ,eliminarServicioDomicilio ,setSchema } = require('../controllers/servicio.controller');
const Router = require('express');
const permit = require('../auth/authorize');
const router = Router();
const handleError = require('../helpers/error.check');
const { validateServicioLocal, validateServicioDomicilio } = require('../validation/validation');


router.use(permit('admin', 'administrativo'));

router.get('/', handleError(obtenerServicios));

router.get('/:idservicio', handleError(obtenerServicio));

router.post('/',validateServicioLocal, handleError(agregarServicioLocal));

router.post('/domicilio',validateServicioDomicilio , handleError(agregarServicioDomicilio));

router.get('/local', handleError(obtenerServiciosLocales));

router.get('/domicilio', handleError(obtenerServiciosDomicilio));

router.get('/zona/:idzona', handleError(obtenerServiciosZona));

router.get('/local/paginacion', handleError(servicioLocalPaginacion));

router.get('/guardias/:id', handleError(obtenerGuardiasServicio));

router.get('/domicilio/paginacion', handleError(servicioDomicilioPaginacion));

router.get('/local/busqueda', handleError(servicioLocalBusqueda));

router.get('/local/guardias/busqueda', handleError(servicioLocalGuardiasBusqueda));

router.get('/local/guardias/paginacion', handleError(obtenerGuardiasServicioPaginacion));

router.delete('/:id', handleError(eliminarServicio));

router.delete('/domicilio/:id', handleError(eliminarServicioDomicilio));

module.exports=router;
