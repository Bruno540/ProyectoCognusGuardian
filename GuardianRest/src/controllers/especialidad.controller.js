const EspecialidadesService = require("../services/especialidades.service");

async function obtenerEspecialidades(req, res){
    res.json(await new EspecialidadesService(req.user.institucion).obtenerEspecialidades());
}

async function agregarEspecialidad(req,res){
    if(await new EspecialidadesService(req.user.institucion).agregarEspecialidad(req.body)){
        res.json({
            message:"Especialidad agregada con exito"
        });
    }
}

async function eliminarEspecialidad(req,res){
    const { id } = req.params;
    if(await new EspecialidadesService(req.user.institucion).eliminarEspecialidad(id)){
        res.json({
            message:"Especialidad eliminada con exito"
        })
    }
    else{
        res.json({
            message:"La especialidad ingresada no existe"
        });
    }
}

async function actualizarEspecialidad(req, res){
    const { id } = req.params;
    if(await new  EspecialidadesService(req.user.institucion).actualizarEspecialidad(id,req.body)){
        res.json({
            data:'Especialidad actualizada'
        });
    }
}

async function especialidadPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new EspecialidadesService(req.user.institucion).especialidadPaginacion(size,page));
}

async function especialidadBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new EspecialidadesService(req.user.institucion).especialidadBusqueda(size,page,filter));
}

module.exports={
    obtenerEspecialidades,
    agregarEspecialidad,
    eliminarEspecialidad,
    actualizarEspecialidad,
    especialidadBusqueda,
    especialidadPaginacion
}