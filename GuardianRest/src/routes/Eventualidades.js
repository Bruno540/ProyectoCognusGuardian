const Router = require('express');

const { obtenerEventualidades, postularse } = require('../controllers/eventualidades.controller');

const permit = require('../auth/authorize');

const handleError = require('../helpers/error.check');

const { validateEventualidad } = require('../validation/validation');

const router = Router();

router.get('',permit('admin', 'medico'), handleError(obtenerEventualidades));

router.post('/postularse',validateEventualidad,permit('medico'), handleError(postularse));

module.exports=router;