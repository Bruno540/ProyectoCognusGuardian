const UbicacionesService = require("../services/ubicaciones.service");

async function obtenerUbicaciones(req,res){
    res.json(await new UbicacionesService(req.user.institucion).obtenerUbicaciones());
}

async function obtenerUbicacionesPaginacion(req,res){
    const { size, page } = req.query;
    res.json(await new UbicacionesService(req.user.institucion).obtenerUbicacionesPaginacion(size,page));
}

async function obtenerUbicacionesBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new UbicacionesService(req.user.institucion).obtenerUbicacionesBusqueda(size,page,filter));
}

async function agregarUbicacion(req,res){
    const { descripcion, idedificio } = req.body;
    await new UbicacionesService(req.user.institucion).agregarUbicacion(descripcion,idedificio);
    res.json({
        message:"Ubicacion agregada con exito"
    });
}

async function actualizarUbicacion(req,res){
    const { id } = req.params;
    const { idedificio, descripcion } = req.body;
    await new UbicacionesService(req.user.institucion).actualizarUbicacion(id,idedificio,descripcion);
    res.json({
        message:"Ubicacion actualizada con exito"
    });
}

async function obtenerUbicacion(req,res){
    const { idedificio } = req.params;
    const { id } = req.query;
    res.json(await new UbicacionesService(req.user.institucion).obtenerUbicacion(id,idedificio));
}

async function eliminarUbicacion(req,res){
    const { idedificio } = req.params;
    const { id } = req.query;
    await new UbicacionesService(req.user.institucion).eliminarUbicacion(id,idedificio);
    res.json({
        message:"Ubicacion eliminada con exito"
    });
}

module.exports= {
    obtenerUbicaciones,
    agregarUbicacion,
    obtenerUbicacion,
    eliminarUbicacion,
    actualizarUbicacion,
    obtenerUbicacionesPaginacion,
    obtenerUbicacionesBusqueda
}