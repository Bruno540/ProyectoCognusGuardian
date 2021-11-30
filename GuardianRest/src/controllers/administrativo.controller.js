const AdministrativosService = require("../services/administrativos.service");

async function obtenerAdministrativos(req,res){
    res.json(await new AdministrativosService(req.user.institucion).obtenerAdminisrativos());
}

async function agregarAdministrativo(req,res){
    const adminCreado = await new AdministrativosService(req.user.institucion).agregarAdministrativo(req.body, req.user.email);
    if(adminCreado){
        res.json({
            message: 'Se agrego el admin correctamente',
            user: adminCreado
        });
    }
    else{
        res.status(400).json({
            message:"Algo salio mal"
        });
    }
}

async function administrativoPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new AdministrativosService(req.user.institucion).administrativoPaginacion(size,page));
}

async function administrativosBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new AdministrativosService(req.user.institucion).administrativosBusqueda(size,page,filter));
}

async function actualizarAdministrativo(req,res){
    const { id } = req.params;
    await new AdministrativosService(req.user.institucion).actualizarAdministrativo(id,req.body,req.user.email);
    res.json({
        message: 'Administrativo actualizado correctamente'
    });
}

async function obtenerAdministrativo(req, res){
    const { id } = req.params;
    res.json(await new AdministrativosService(req.user.institucion).obtenerAdministrativo(id));
}

async function eliminarAdministrativo(req, res){
    const { id } = req.params;
    await new AdministrativosService(req.user.institucion).eliminarAdministrativo(id, req.user.email);
    res.status(200).json({
        message:'Usuario eliminado'
    });
}



module.exports={
    obtenerAdministrativos,
    agregarAdministrativo,
    administrativoPaginacion,
    administrativosBusqueda,
    actualizarAdministrativo,
    obtenerAdministrativo,
    eliminarAdministrativo
}