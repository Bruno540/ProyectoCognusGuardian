const axios = require('axios');

const { signup } = require("../controllers/registro.controller");
const Suscripcion = require('../models/Suscripcion');

const getPayPalAccessToken = async () => {
    const client_id = process.env.PAYPAL_CLIENT_ID;
    const client_secret = process.env.PAYPAL_CLIENT_SECRET;
    const authLink = process.env.PAYPAL_AUTH_LINK;
    const options = {
      url: authLink,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: client_id,
        password: client_secret,
      },
      params: {
        grant_type: "client_credentials",
      },
    };
    const { status, data } = await axios(options);
    return data.access_token;
};

async function createSuscription(req,res){
    const { id, email, nombre, apellido, telefono, institucion} = req.body;
    Suscripcion.create({
        id,
        email,
        nombre,
        apellido,
        telefono,
        institucion
    }).then(sus=>{
        res.json({
            message: "Suscripcion registrada con exito",
            ok:true
        });
    }).catch(error => {
        console.log(error);
        res.status(400).json({
            message: "Algo sallio mal",
            ok:false
        })
    });
}

async function authorizePayment(req,res){
    res.status(200).send('OK');
    const token = await getPayPalAccessToken();
    const header = req.headers;
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    //console.log(req.body);
    const datos = req.body;
    const webhookObjJSON = '{' +
    '"auth_algo": "' + header['paypal-auth-algo'] + '"' +
    ',"cert_url": "' + header['paypal-cert-url'] + '"' +
    ',"transmission_id": "' + header['paypal-transmission-id'] + '"' +
    ',"transmission_sig": "' + header['paypal-transmission-sig'] + '"' +
    ',"transmission_time": "' + header['paypal-transmission-time'] + '"' +
    ',"webhook_id": "' + webhookId + '"' +
    ',"webhook_event": ' + JSON.stringify(req.body) +
    '}';
    const link = process.env.PAYPAL_VERIFY_LINK;
    axios.post(link, webhookObjJSON, config).then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
        if(res.data.verification_status==="SUCCESS"){
            paypalSuccessHandler(datos.event_type, req.body.resource);
        }
    })
    .catch(error => {
        console.error(error)
    });
}

async function paypalSuccessHandler(event, data){
    switch(event){
        case "BILLING.SUBSCRIPTION.ACTIVATED":{
           const subId = data.id;
            const subStatus = data.status;
            const datos = {
                subId,
                subStatus
            }
            signup(datos);
            break;
        }
        case "BILLING.SUBSCRIPTION.CANCELLED":{
            console.log("SE CANCELO LA SUSCRIPCION SATISFACTORIAMENTE");
            break;
        }
        case "BILLING.SUBSCRIPTION.EXPIRED":{
            console.log("EXPIRO LA SUSCRIPCION");
            break;
        }
    }
}

function verifySuscription(req,res){
    return res.json({
        message:"SUSCRIPCION OK"
    });
}

async function destroySuscription(req,res){
    const { id } = req.params;
    await Suscripcion.destroy({
        where:{
            id
        }
    }).then(data=> res.json({message:"Suscripcion eliminada con exito"}), err =>res.json({message:"Algo salio mal"}));
}

module.exports={
    authorizePayment,
    createSuscription,
    verifySuscription,
    destroySuscription
}