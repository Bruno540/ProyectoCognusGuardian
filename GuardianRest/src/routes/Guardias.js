const Router = require('express');

const { obtenerGuardias, agregarGuardia, actualizarGuardia, eliminarGuardia, guardiasPaginacion, asignarMedicosGuardia, obtenerMedicosAsignados, obtenerMedicosPostulados, test, quitarAsignacionMedico, publicarGuardia, getEspecialidadesGuardia, getCuposFaltantesGuardia, cerrarGuardia, obtenerHorariosFavoritos, obtenerGuardiasFecha, obtenerGuardia } = require('../controllers/guardia.controller');

const permit = require('../auth/authorize');

const handleError = require('../helpers/error.check');
const {validateGuardia, validateAsignMedico, validateIdGuardia,validateUpdateGuardia} = require("../validation/validation");

const router = Router();

router.use(permit('admin','administrativo'));

router.get('/', handleError(obtenerGuardias));

router.get('/:id', handleError(obtenerGuardia));

router.get('/filter/fecha', handleError(obtenerGuardiasFecha));

router.get('/medicosasign/:idguardia', handleError(obtenerMedicosAsignados));

router.post('/quitarasign', handleError(quitarAsignacionMedico));

router.get('/medicospostu/:idguardia', handleError(obtenerMedicosPostulados));

router.post('/medicos/:idguardia',validateAsignMedico, handleError(asignarMedicosGuardia));

router.post('/', validateGuardia, handleError(agregarGuardia));

router.post('/publicar/:idguardia',validateIdGuardia, handleError(publicarGuardia));

router.put('/:id',validateUpdateGuardia, handleError(actualizarGuardia));

router.delete('/:id', handleError(eliminarGuardia))

router.get('/paginacion', handleError(guardiasPaginacion));

router.get('/cuposfaltantes/:idguardia', handleError(getCuposFaltantesGuardia));

router.post('/cerrar/:idguardia',validateIdGuardia, handleError(cerrarGuardia));

module.exports = router;