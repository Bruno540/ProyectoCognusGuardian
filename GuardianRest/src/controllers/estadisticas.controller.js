const EstadisticasService = require("../services/estadisticas.service");

async function obtenerHorasMedicos(req, res){
    const { fechainicio, fechafin } = req.query;
    res.json(await new EstadisticasService(req.user.institucion).obtenerHorasMedicos(fechainicio,fechafin));
}

async function obtenerHorariosFavoritos(req,res){
    const { fechainicio, fechafin } = req.query;
    res.json(await new EstadisticasService(req.user.institucion).obtenerHorariosFavoritos(fechainicio, fechafin));
}

async function obtenerEventualidades(req,res){
    const { fechainicio, fechafin } = req.query;
    res.json(await new EstadisticasService(req.user.institucion).obtenerEventualidades(fechainicio,fechafin));
}

module.exports={
    obtenerHorasMedicos,
    obtenerHorariosFavoritos,
    obtenerEventualidades
}