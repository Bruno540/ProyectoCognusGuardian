const Router = require('express');
const permit = require('../auth/authorize');
const { obtenerDatos, obtenerGuardias, obtenerGuardiasDisponibles, postularseGuardia, getEspecialidadesGuardia, obtenerPostulaciones, cancelarPostulacion, ofrecerLiberarGuardia, actualizarDatos, sincronizarCalendario, confirmarSyncCalendar, agregarTelefono, verificarTelefono, sincronizarTelefono, passwordChange, obtenerGuardiasCompletadas, quitarSincronizacionCalendario, checkIfSyncCalendar } = require('../controllers/acciones.medico');
const handleError = require('../helpers/error.check');
const { validatePostularseGuardia, validateIdGuardia, validateEspecialidadesGuardia } = require('../validation/validation');
const { upload } = require('../config/multer.config');
const router = Router();

router.use(permit('medico','admin','administrativo'));

router.post('/password/change',handleError(passwordChange))

router.use(permit('medico'));

router.get('/datos', handleError(obtenerDatos));

router.get('/guardias', handleError(obtenerGuardias));

router.get('/guardiasdisponibles', handleError(obtenerGuardiasDisponibles));

router.get('/guardiascompletadas', handleError(obtenerGuardiasCompletadas));

router.get('/guardiaspostuladas', handleError(obtenerPostulaciones));

router.post('/postularse/:idguardia',validatePostularseGuardia, handleError(postularseGuardia));

router.get('/especialidades/:idguardia', validateIdGuardia, handleError(getEspecialidadesGuardia));

router.post('/cancelarpostulacion/:idguardia',validateIdGuardia,handleError(cancelarPostulacion));

router.post('/liberar/:idguardia', validateIdGuardia, handleError(ofrecerLiberarGuardia));

router.put('/',upload.single("file"), handleError(actualizarDatos));

router.post('/sincronizarCalendar',handleError(sincronizarCalendario));

router.post('/quitcalendarsync',handleError(quitarSincronizacionCalendario));

router.post('/confirmarSyncCalendar',handleError(confirmarSyncCalendar));

router.post('/ckcalendar',handleError(checkIfSyncCalendar));

module.exports=router;