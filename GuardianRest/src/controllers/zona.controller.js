const { Op } = require("sequelize");
const { selectSchema } = require('../database/database');
const ZonasService = require("../services/zonas.service");
const ApiError = require("../helpers/api.error");

async function obtenerZonas(req,res){
    return res.json(
        await new ZonasService(req.user.institucion).obtenerZonas()
    );
}

async function agregarZona(req,res){
    const { pais, departamento, localidad } = req.body;
    if(await new ZonasService(req.user.institucion).crearZona(pais,departamento,localidad)){
        res.json({
            message: "Se agrego la zona correctamente"
        });
    }
}

async function obtenerZonasPaginacion(req, res){
    const { size, page } = req.query;
    res.json(await new ZonasService(req.user.institucion).obtenerZonasPaginacion(size,page));
}

async function obtenerZonasBusqueda(req, res){
    const { filter,size, page } = req.query;
    res.json(await new ZonasService(req.user.institucion).obtenerZonasBusqueda(size,page,filter));
}

async function actualizarZona(req, res) {
    const {id} = req.params;
    if (await new ZonasService(req.user.institucion).actualizarZona(id, req.body)) {
        res.json({
            message: "Zona actualizada"
        });
    }
}

async function eliminarZona(req,res){
    const { id } = req.params;
    if(await new ZonasService(req.user.institucion).eliminarZona(id)){
        res.json({
            message: "La zona ha sido eliminada correctamente"
        });
    }
    else{
        throw ApiError.badRequestError("La zona no existe");
    }
}

module.exports={
    obtenerZonas,
    agregarZona,
    obtenerZonasPaginacion,
    obtenerZonasBusqueda,
    actualizarZona,
    eliminarZona
}