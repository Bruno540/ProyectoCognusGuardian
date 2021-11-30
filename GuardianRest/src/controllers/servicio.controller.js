const ServiciosService = require("../services/servicios.service");

async function obtenerServicios(req,res){
    res.json(await new ServiciosService(req.user.institucion));
}

async function obtenerServicio(req,res){
    const { idservicio } = req.params;
    res.json(await new ServiciosService(req.user.institucion).obtenerServicio(idservicio));
}

async function eliminarServicio(req,res){
    const { id } = req.params;
    await new ServiciosService(req.user.institucion).eliminarServicioLocal(id);
    res.status(200).json({
        message:'Servicio eliminado'
    });
}

async function eliminarServicioDomicilio(req,res){
    const { id } = req.params;
    await new ServiciosService(req.user.institucion).eliminarServicioDomicilio(id);
    res.status(200).json({
        message:'Servicio eliminado'
    });
}

async function obtenerServiciosLocales(req,res){
    res.json(await new ServiciosService(req.user.institucion).obtenerServiciosLocales());
}

async function obtenerServiciosDomicilio(req,res){
    res.json(await new ServiciosService(req.user.institucion).obtenerServiciosDomicilio());
}

async function obtenerServiciosZona(req,res){
    const { idzona } = req.params;
    res.json(await new ServiciosService(req.user.institucion).obtenerServiciosZona(idzona));
}

async function agregarServicioLocal(req,res){
    const { idtipo, especialidades, idedificio, idubicacion } = req.body;
    const datosServicioLocal = {idtipo,idedificio,idubicacion};
    await new ServiciosService(req.user.institucion).agregarServicioLocal(datosServicioLocal,especialidades);
    res.json({
        message:"Servicio agregado exitosamente"
    });
}

async function agregarServicioDomicilio(req,res){
    const { especialidades, idzona} = req.body;
    await new ServiciosService(req.user.institucion).agregarServicioDomicilio(idzona,especialidades);
    res.json({
        message:"Servicio agregado con exito"
    });
}

async function servicioLocalPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await  new ServiciosService(req.user.institucion).servicioLocalPaginacion(size,page));
}

async function servicioDomicilioPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new ServiciosService(req.user.institucion).servicioDomicilioPaginacion(size,page));
}

async function obtenerGuardiasServicio(req,res){
    const { id } = req.params;
    res.json(await new ServiciosService(req.user.institucion).obtenerGuardiasServicio(id));
}

async function obtenerGuardiasServicioPaginacion(req,res){
    const { id, size, page  } = req.query;
    res.json(await new ServiciosService(req.user.institucion).obtenerGuardiasServicioPaginacion(id,size,page));
}

async function servicioLocalBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new ServiciosService(req.user.institucion).servicioLocalBusqueda(size,page,filter));
}

async function servicioLocalGuardiasBusqueda(req, res){
    const { id, filter,size, page } = req.query;
    res.json(await new ServiciosService(req.user.institucion).servicioLocalGuardiasBusqueda(id,filter,size,page));
}

module.exports={
    obtenerServicios,
    agregarServicioLocal,
    obtenerServiciosLocales,
    obtenerServiciosDomicilio,
    agregarServicioDomicilio,
    obtenerServiciosZona,
    servicioLocalPaginacion,
    obtenerGuardiasServicio,
    servicioDomicilioPaginacion,
    obtenerServicio,
    servicioLocalBusqueda,
    servicioLocalGuardiasBusqueda,
    obtenerGuardiasServicioPaginacion,
    eliminarServicio,
    eliminarServicioDomicilio
}