const MedicosService = require("../services/medicos.service");

async function agregarMedico(req, res) {
    const { email, nombre, apellido, telefono, direccion, fecha_nac, especialidades, idzona } = req.body;
    const datosUsuario = { email, nombre, apellido, telefono };
    const datosMedico = {direccion,fecha_nac,idzona}
    await new MedicosService(req.user.institucion).agregarMedico(datosUsuario,datosMedico,req.file,especialidades, req.user.email);
    res.json({
        message:"Medico creado con exito"
    });
}

async function obtenerMedicos(req, res) {
    res.json(await new MedicosService(req.user.institucion).obtenerMedicos());
}

async function obtenerGuardias(req,res){
    const { id } = req.params;
    res.json(await new MedicosService(req.user.institucion).obtenerGuardias(id));
}

async function obtenerMedico(req, res){
    const { id } = req.params;
    res.json(await new MedicosService(req.user.institucion).obtenerMedico(id));
}

async function eliminarMedico(req, res){
    const { id } = req.params;
    await new MedicosService(req.user.institucion).eliminarMedico(id,req.user.email);
    res.status(200).json({
        message:'Usuario eliminado'
    });
}

async function actualizarMedico(req, res){
    const { id } = req.params;
    const { direccion, fecha_nac, nombre, apellido, telefono } = req.body;
    const datosUsuario = { nombre, apellido, telefono };
    const datosMedico = {direccion,fecha_nac}
    await new MedicosService(req.user.institucion).actualizarMedico(id,datosMedico,datosUsuario,req.file,req.user.email);
    res.json({
        data: 'Medico actualizado correctamente'
    });
}

async function medicosPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new MedicosService(req.user.institucion).medicosPaginacion(size,page));
}

async function medicosBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new MedicosService(req.user.institucion).medicosBusqueda(size,page,filter));
}

async function agregarEspecialidadesMedico(req, res){
    const { id } = req.params;
    const { especialidades } = req.body;
    await new MedicosService(req.user.institucion).agregarEspecialidadesMedico(id,especialidades);
    res.json({
        message:"Especialidades agregadas con exito"
    });
}

async function quitarEspecialidadMedico(req,res){
    const {idmedico, especialidad } = req.body;
    await new MedicosService(req.user.institucion).quitarEspecialidadMedico(idmedico,especialidad);
    res.json({
        message:"Se ha quitado la especialidad correctamente"
    });
}

module.exports = {
    agregarMedico,
    obtenerMedicos,
    obtenerMedico,
    eliminarMedico,
    actualizarMedico,
    medicosPaginacion,
    medicosBusqueda,
    obtenerGuardias,
    agregarEspecialidadesMedico,
    quitarEspecialidadMedico,
    agregarEspecialidadesMedico
}