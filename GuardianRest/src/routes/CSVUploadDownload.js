const Router = require('express');
const router = Router();
const handleError = require('../helpers/error.check');

const permit = require('../auth/authorize');

const {uploadCsv} = require('../config/multer.config');

const csvWorker = require('../controllers/csv.controller');

router.use(permit('admin'));

router.use(uploadCsv.single("file"));

router.post('/administrativos', handleError(csvWorker.uploadFile));

router.post('/zonas', handleError(csvWorker.uploadzonaFile));

router.post('/medicos', handleError(csvWorker.uploadMedicoFile));

router.post('/especialidades', handleError(csvWorker.uploadespecialidadesFile));

router.post('/edificios', handleError(csvWorker.uploadEdificiosFile));

router.post('/tipoServicio', handleError(csvWorker.uploadTiposServicioFile));

router.get('/:nombre', handleError(csvWorker.downloadFile));

module.exports=router;