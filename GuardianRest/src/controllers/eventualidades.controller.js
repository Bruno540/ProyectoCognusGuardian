const EventualidadesService = require("../services/eventualidades.service");

async function obtenerEventualidades(req, res){
    const idmedico = req.user.id;
    res.json(await new EventualidadesService(req.user.institucion).obtenerEventualidades(idmedico));
}

async function postularse(req, res){
    const idmedico = req.user.id;
    const { idev } = req.body;
    await new EventualidadesService(req.user.institucion).postularse(idmedico,idev);
    res.json({
        message:"Postulacion agregada con exito"
    });
}

module.exports={
    obtenerEventualidades,
    postularse
}