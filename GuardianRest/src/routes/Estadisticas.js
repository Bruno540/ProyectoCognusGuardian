const Router = require('express');
const handleError = require('../helpers/error.check');
const permit = require('../auth/authorize');
const {obtenerHorasMedicos, obtenerHorariosFavoritos, obtenerEventualidades} = require("../controllers/estadisticas.controller");

const router = Router();

router.use(permit('admin','administrativo'));

router.get('/horas', handleError(obtenerHorasMedicos));

router.get('/horariosfavoritos', handleError(obtenerHorariosFavoritos));

router.get('/eventualidades', handleError(obtenerEventualidades));

router.get('/eventualidades', obtenerEventualidades);

module.exports=router;