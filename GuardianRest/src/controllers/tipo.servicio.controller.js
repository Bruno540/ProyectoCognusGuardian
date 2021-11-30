const TipoServicioService = require("../services/tiposervicio.service");

async function agregarTipo(req,res){
    const { nombre } = req.body;
    if(await new TipoServicioService(req.user.institucion).agregarTipo(nombre)){
        res.json({
            message:"Tipo de servicio agregado exitosamente"
        });
    }
    else{
        res.status(400).json({
            message:"Algo salio mal"
        });
    }
}

async function obtenerTiposPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new TipoServicioService(req.user.institucion).obtenerTiposPaginacion(size,page));
}

async function obtenerTiposBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new TipoServicioService(req.user.institucion).obtenerTiposBusqueda(size,page,filter));
}

async function actualizarTipoServicio(req, res){
    const { id } = req.params;
    const { nombre } = req.body;
    await new TipoServicioService(req.user.institucion).actualizarTipoServicio(id,nombre);
    res.json({
        message:'Tipo de servicio actualizado'
    })
}

async function eliminarTipoServicio(req,res){
    const { id } = req.params;
    await new TipoServicioService(req.user.institucion).eliminarTipoServicio(id);
    res.json({
        message:"Servicio eliminado con exito"
    });
}

async function obtenerTipos(req,res){
    res.json(await new TipoServicioService(req.user.institucion).obtenerTipos());
}

module.exports = {
    obtenerTipos,
    agregarTipo,
    obtenerTiposPaginacion,
    obtenerTiposBusqueda,
    actualizarTipoServicio,
    eliminarTipoServicio
}