const AccionesMedicoService = require("../services/acciones.medico.service");
const MedicosService = require("../services/medicos.service");

async function obtenerDatos(req,res){
    const id = req.user.id;
    res.json(await new AccionesMedicoService(req.user.institucion).obtenerDatos(id));
}

async function obtenerGuardias(req,res){
    const id = req.user.id;
    res.json(await new AccionesMedicoService(req.user.institucion).obtenerGuardias(id));
}

async function obtenerPostulaciones(req,res){
    const { id } = req.user;
    res.json(await new AccionesMedicoService(req.user.institucion).obtenerPostulaciones(id));
}

async function obtenerGuardiasDisponibles(req,res){
    const { id } = req.user;
    res.json(await new AccionesMedicoService(req.user.institucion).obtenerGuardiasDisponibles(id));
}

async function getEspecialidadesGuardia(req,res){
    const { idguardia } = req.params;
    const id = req.user.id;
    res.json(await new AccionesMedicoService(req.user.institucion).getEspecialidadesGuardia(id,idguardia));
}

async function postularseGuardia(req,res){
    const idmedico = req.user.id;
    const {idguardia} = req.params;
    const { idesp } = req.body;
    await new AccionesMedicoService(req.user.institucion).postularseGuardia(idmedico,idguardia,idesp);
    res.json({
        message: "Postulacion registrada con exito"
    });
}

async function cancelarPostulacion(req,res){
    const { idguardia } = req.params;
    const { id } = req.user;
    await new AccionesMedicoService(req.user.institucion).cancelarPostulacion(id,idguardia)
    res.json({
        message:"Postulacion cancelada con exito"
    });
}
async function ofrecerLiberarGuardia(req,res){
    const idmedico = req.user.id;
    const {idguardia} = req.params;
    if(await new AccionesMedicoService(req.user.institucion).ofrecerLiberarGuardia(idmedico,idguardia)){
        res.json({
            message:"Guardia ofrecida para liberacion"
        });
    }
    else{
        res.status(400).json({
            error: "Algo salio mal"
        });
    }
}

async function actualizarDatos(req, res){
    const id= req.user.id;
    const { direccion, fecha_nac, nombre, apellido, telefono } = req.body;
    const datosUsuario = { nombre, apellido, telefono };
    const datosMedico = {direccion,fecha_nac}
    await new MedicosService(req.user.institucion).actualizarMedico(id,datosMedico,datosUsuario,req.file);
    res.json({
        data: 'Medico actualizado correctamente'
    });
}

async function sincronizarCalendario(req,res){
    res.json(await new AccionesMedicoService(req.user.institucion).sincronizarCalendario(req.user));
}

async function confirmarSyncCalendar(req,res){
    const { code, idmedico} = req.body;
    await new AccionesMedicoService(req.user.institucion).confirmarSyncCalendar(code,idmedico);
    res.json({
        message:"Sincronizacion con Google Calendar finalizada con exito"
    });
}

async function passwordChange(req,res){
    const { newPassword, newPasswordVerification } = req.body;
    await new AccionesMedicoService(req.user.institucion).changePasswordMedico(req.user, newPassword, newPasswordVerification);
    res.json({
        message:"Se ha cambiado la contraseña satisfactoriamente"
    });
}

async function obtenerGuardiasCompletadas(req,res){
    const { fechainicio, fechafin } = req.query; 
    res.json(await new AccionesMedicoService(req.user.institucion).obtenerGuardiasCompletadas(req.user.id, fechainicio, fechafin));
}


module.exports={
    obtenerDatos,
    obtenerGuardias,
    obtenerGuardiasDisponibles,
    postularseGuardia, 
    getEspecialidadesGuardia,
    obtenerPostulaciones,
    cancelarPostulacion,
    ofrecerLiberarGuardia,
    actualizarDatos,
    sincronizarCalendario,
    confirmarSyncCalendar,
    passwordChange,
    obtenerGuardiasCompletadas
}