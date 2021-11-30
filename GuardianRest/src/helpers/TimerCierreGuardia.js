const Guardia = require('../models/Guardia');
const { Op } = require("sequelize");

async function actualizarTiempos(){
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
        const fechaResultado = new Date(guardia.fechainicio).getTime() - semana;
        const delay = fechaResultado - new Date().getTime();
        if(delay<=0){
            guardia.estado='CERRADA';
            guardia.save();
        }
        else{
            setTimeout(async (datos)=>{
                await Guardia.update({
                    estado: 'CERRADA'
                },{
                    where:{
                        id: guardia.id
                    }
                });
            }, delay, guardia);
        }
    }
}

module.exports={
    actualizarTiempos
}