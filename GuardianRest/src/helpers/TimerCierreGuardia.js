const { Op } = require("sequelize");

async function actualizarTiempos(Guardia){
    const guardias = await Guardia.findAll({
        where: {
            [Op.or]:[
                {
                    estado:'PENDIENTE'
                },
                {
                    estado:'PUBLICADA'
                }
            ]
        }
    });
    for(const guardia of guardias){
        const delay = new Date(guardia.fechainicio).getTime() - new Date().getTime(); 
        if(delay<0){
            guardia.update({
                estado: 'CERRADA'
            });
        }
        else{
            setTimeout(async (datos)=>{
                await guardia.update({
                    estado: 'CERRADA'
                });
            }, delay, guardia);
        }
    }
}

module.exports={
    actualizarTiempos
}