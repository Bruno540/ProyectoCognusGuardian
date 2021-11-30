const EdificiosService = require("../services/edificios.service");

async function obtenerEdificios(req,res){
    res.json(await new EdificiosService(req.user.institucion).obtenerEdificios());
}

async function agregarEdificio(req,res){
    if(await new EdificiosService(req.user.institucion).agregarEdificio(req.body,req.file)){
        res.json({
           message:"Edificio creado correctamente"
        });
    }
    else{
        res.status(400).json({
            message:"Algo salio mal"
        });
    }
}

async function eliminarEdificio(req,res){
    const { id } = req.params;
    if(await new EdificiosService(req.user.institucion).eliminarEdificio(id)){
        res.json({
            message:"Edificio eliminado con exito"
        });
    }
    else{
        res.status(400).json({
            message:"Algo salio mal"
        });
    }
}

async function obtenerSalasEdificioPaginacion(req,res){
    const { id, size, page } = req.query;
    res.json(await new EdificiosService(req.user.institucion).obtenerSalasEdificioPag(id,size,page));
}

async function obtenerUbicacionesDisponibles(req,res){
    const { id } = req.params;
    res.json(await new EdificiosService(req.user.institucion).obtenerUbicacionesDisponibles(id));
}

async function obtenerServiciosEdificio(req,res){
    const { id }  = req.params;
    res.json(await new EdificiosService(req.user.institucion).obtenerServiciosEdificio(id));
}

async function obtenerEdificio(req,res){
    const { id } = req.params;
    res.json(await new EdificiosService(req.user.institucion).obtenerEdificio(id));
}

async function actualizarEdificio(req,res){
    const { id } = req.params;
    await new EdificiosService(req.user.institucion).actualizarEdificio(id,req.body);
    res.json({
        message:"Edificio atualizado exitosamente"
    });
}

async function edificiosBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new EdificiosService(req.user.institucion).edificiosBusqueda(size,page,filter));
}

async function edificiosPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new EdificiosService(req.user.institucion).edificiosPaginacion(size,page));
}

module.exports={
    obtenerEdificios,
    agregarEdificio,
    eliminarEdificio,
    obtenerServiciosEdificio,
    obtenerEdificio,
    actualizarEdificio,
    edificiosBusqueda,
    edificiosPaginacion,
    obtenerUbicacionesDisponibles,
    obtenerSalasEdificioPaginacion
}