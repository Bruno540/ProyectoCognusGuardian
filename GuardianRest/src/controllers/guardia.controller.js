const GuardiasService = require("../services/guardias.service");

async function obtenerGuardias(req,res){
    res.json(await new GuardiasService(req.user.institucion).obtenerGuardias());
}

async function actualizarGuardia(req,res){
    const { id } = req.params;
    const { fechainicio, fechafin } = req.body;
    await new GuardiasService(req.user.institucion).actualizarGuardia(id,fechainicio,fechafin);
    res.status(200).json({
        message:'Guardia actualizada con exito'
    });
}

async function agregarGuardia(req,res){
    if(await new GuardiasService(req.user.institucion).agregarGuardia(req.body)) {
        res.json({
            message:"Guardia agregada con exito"
        });
    }
    else{
        res.status(400).json({
            message:"Algo salio mal"
        });
    }
}

async function eliminarGuardia(req,res){
    const { id } = req.params;
    await new GuardiasService(req.user.institucion).eliminarGuardia(id);
    res.status(200).json({
        message:'Guardia eliminada'
    });
}

async function getCuposFaltantesGuardia(req,res){
    const { idguardia } = req.params;
    res.json(await new GuardiasService(req.user.institucion).getCuposFaltantesGuardia(idguardia));
}

async function asignarMedicosGuardia(req,res){
    const { idguardia } = req.params;
    const { idmedicos } = req.body;
    await new GuardiasService(req.user.institucion).asignarMedicosGuardia(idguardia,idmedicos);
    res.json({
        message:"Medicos asignados con exito"
    });
}

async function quitarAsignacionMedico(req,res){
    const { idguardia, idmedico } = req.body;
    await new GuardiasService(req.user.institucion).quitarAsignacionMedico(idguardia,idmedico);
    return res.json({
        message: "Se ha quitado la asignacion correctamente"
    });
}

async function obtenerMedicosAsignados(req,res){
    const {idguardia} = req.params;
    res.json(await new GuardiasService(req.user.institucion).obtenerMedicosAsignados(idguardia));
}

async function cerrarGuardia(req,res){
    const {idguardia} = req.params;
    await new GuardiasService(req.user.institucion).cerrarGuardia(idguardia);
    res.json({
        message: "Guardia cerrada con exito"
    });
}

async function obtenerMedicosPostulados(req,res){
    const {idguardia} = req.params;
    res.json(await new GuardiasService(req.user.institucion).obtenerMedicosPostulados(idguardia));
}

async function guardiasPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new GuardiasService(req.user.institucion).guardiasPaginacion(size,page));
}

async function publicarGuardia(req,res){
    const { idguardia } = req.params;
    await new GuardiasService(req.user.institucion).publicarGuardia(idguardia);
    res.json({
        message:"La guardia se ha publicado con exito"
    });
}

async function obtenerGuardiasFecha(req,res){
    const { fecha, rango } = req.query;
    return res.json(await new GuardiasService(req.user.institucion).obtenerGuardiasFecha(fecha,rango));
}

async function obtenerGuardia(req,res){
    const { id } = req.params;
    res.json(await new GuardiasService(req.user.institucion).obtenerGuardia(id));
}

module.exports={
    obtenerGuardias,
    obtenerGuardia,
    agregarGuardia,
    actualizarGuardia,
    eliminarGuardia,
    guardiasPaginacion,
    obtenerMedicosAsignados,
    obtenerMedicosPostulados,
    asignarMedicosGuardia,
    quitarAsignacionMedico,
    publicarGuardia,
    getCuposFaltantesGuardia,
    cerrarGuardia,
    obtenerGuardiasFecha
}