const CsvService = require("../services/csv.service");

async function uploadFile(req, res){
    await new CsvService(req.user.institucion).uploadFile(req.file).then(data => {
        res.json(data);
    },err=>{
        res.status(400).json(err);
    })
}

async function uploadzonaFile(req, res){
    await new CsvService(req.user.institucion).uploadzonaFile(req.file).then(data => {
        res.json(data);
    },err=>{
        res.status(400).json(err);
    })
}

async function uploadMedicoFile(req, res){
    await new CsvService(req.user.institucion).uploadMedicoFile(req.file).then(data => {
        res.json(data);
    },err=>{
        res.status(400).json(err);
    })
}

async function uploadespecialidadesFile(req, res){
    await new CsvService(req.user.institucion).uploadespecialidadesFile(req.file).then(data => {
        res.json(data);
    },err=>{
        res.status(400).json(err);
    })
}

async function uploadEdificiosFile(req, res){
    await new CsvService(req.user.institucion).uploadEdificiosFile(req.file).then(data => {
        res.json(data);
    },err=>{
        res.status(400).json(err);
    })
}

async function uploadTiposServicioFile(req, res){
    await new CsvService(req.user.institucion).uploadTiposServicioFile(req.file).then(data => {
        res.json(data);
    },err=>{
        res.status(400).json(err);
    })
}

async function downloadFile(req, res){
    var { nombre } = req.params;
    return res.json(await new CsvService(req.user.institucion).downloadFile(nombre));
}

module.exports={
    uploadFile,
    uploadzonaFile,
    uploadMedicoFile,
    uploadespecialidadesFile,
    uploadEdificiosFile,
    uploadTiposServicioFile,
    downloadFile
}