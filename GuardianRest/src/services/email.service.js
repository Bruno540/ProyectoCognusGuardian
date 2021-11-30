const nodemailer = require('nodemailer');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function getEmailRegisterBody(nombre, email, password){
  const frontUrl = process.env.FRONTEND_URL;
  return `
    <body style="background-color: #e9ecef;padding-top: 5%; margin-top: 5%;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <h1 style="margin: 0 0 12px; font-size: 32px; font-weight: 400; line-height: 48px;">Hola, ${nombre}!</h1>
                  <p style="margin: 0;">Bienvenido a <label style="color: blue;">Guardian</label></p>
                  <p> Gracias por ser parte de nuestra plataforma!.</p>
                  <p style="margin: 0;">Tus credenciales de ingreso son:</p>
                  <p>Email: ${email}</p>
                  <p>Contraseña: ${password}</p>
                  <p style="color: rgb(197, 138, 28);">Te recomendamos que la cambies por una contraseña segura que no hayas utilizado en otro sitio.</p>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href="${frontUrl}/component/login" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Guardian</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">Saludos,<br> GuardianTeam</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">Has recibido este email porque has sido registrado en la plataforma de gestion de guardias asistenciales <label style="color: blue;">Guardian</label>. Si tu no estas asociado a una institucion disponible en la plataforma puedes eliminar este correo.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>`
}




async function enviarEmail(email, nombre, password){
    const body = getEmailRegisterBody(nombre,email,password)
    const active = process.env.NOTIFICATIONS;
    if(active==="TRUE"){
      const senderEmail = process.env.TWILIO_SENDER_EMAIL;
      const senderPassword = process.env.TWILIO_SENDER_PASSWORD;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword
            }
        });
        const mailOptions = {
            from: 'Guardian gestion asistencial',
            to: email,
            subject: 'Notificacion de registro',
            html: body
        };
        transporter.sendMail(mailOptions, (err, data)=>{
            console.log("Email enviado");
        });
    }
}

async function enviarEmailSimple(email, message){
  const active = process.env.NOTIFICATIONS;
  if(active==="TRUE"){
    const senderEmail = process.env.TWILIO_SENDER_EMAIL;
    const senderPassword = process.env.TWILIO_SENDER_PASSWORD;
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: senderEmail,
              pass: senderPassword
          }
      });
      const mailOptions = {
          from: 'Guardian gestion asistencial',
          to: email,
          subject: 'Notificacion de registro',
          text: message
      };
      transporter.sendMail(mailOptions, (err, data)=>{
          console.log("Email enviado");
      });
  }
}

async function enviarNotificacion(message,number){
  const active = process.env.NOTIFICATIONS;
  const twilioWhatsappPhone = process.env.TWILIO_WHATSAPP_PHONE;
    if(client && active==="TRUE"){
      client.messages
            .create({
                body: message,
                from: `whatsapp:${twilioWhatsappPhone}`,
                to: `whatsapp:+598${number.substring(1)}`
            })
            .then().catch(err=>console.log("Error en la conexion con twilio, revise las credenciales ingresadas"))
            .done();
      const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_ID;
      client.messages
            .create({
                body: message,
                messagingServiceSid,
                to: `+598${number.substring(1)}`
            })
            .then().catch(err=>console.log("Error en la conexion con twilio, revise las credenciales ingresadas"))
            .done();
    }

}

const fs = require('fs');
const {google} = require('googleapis');

const SCOPES = [process.env.GOOGLE_SCOPE_CALENDAR];

function syncCalendar(user){
  const oAuth2Client = getApiCredentials();
  return getAccessToken(oAuth2Client, user);
}
async function getOAuth(token){
  const content = fs.readFileSync('credentials.json');
  return authorize(JSON.parse(content), token);
}


function authorize(credentials, token) {
  const {client_secret, client_id, redirect_uri} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
  if(!token){
    return false;
  }
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

function getAccessToken(oAuth2Client,user) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state:user.id
  });
  return authUrl;
}

function getApiCredentials(){
  const content = fs.readFileSync('credentials.json');
  if (!content) return console.log('Error loading client secret file:', err);
  const credentials = JSON.parse(content);
  const {client_secret, client_id, redirect_uri} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri,{
    access_type: 'offline'
  });
  return oAuth2Client;
}

async function getTokenByCode(code){
  const oAuth2Client = getApiCredentials(); 
  const token = await oAuth2Client.getToken(code);
  return token.tokens;
}

async function addEvent(guardiaDescripcion, ubicacion, fechainicio, fechafin, token, idGuardia){
  const idEvento = (idGuardia*10000).toString();
  const auth = await getOAuth(token);
  if(auth){
    var event = {
      'id': idEvento,
      'summary': 'Guardian Event',
      'location': ubicacion,
      'description': guardiaDescripcion,
      'start': {
        'dateTime': fechainicio,
        'timeZone': 'America/Montevideo',
      },
      'end': {
        'dateTime': fechafin,
        'timeZone': 'America/Montevideo',
      },
      'attendees': [
      ],
      'status':"confirmed",
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10},
        ],
      },
    };
    const calendar = google.calendar({version: 'v3', auth});
    await calendar.events.insert(
      {
      auth: auth,
      calendarId: 'primary',
      resource: event,
      sendUpdates : 'all'
    }).then(data=>console.log(data)).catch(async err=>{
      if(err.code===409){
        await calendar.events.update(
          {
          auth: auth,
          calendarId: 'primary',
          resource:event,
          eventId: idEvento
        });
      }
    })
  }
}

async function deleteEvent(token, idGuardia){
  const idEvento = (idGuardia*10000).toString();
  const auth = await getOAuth(token);
  const calendar = google.calendar({version: 'v3', auth});
  await calendar.events.delete({
    auth: auth,
    calendarId: 'primary',
    sendUpdates : 'all',
    eventId: idEvento
  }).then(data=> console.log("Evento eliminado")).catch(err=> console.log("Error al eliminar el evento"));
}

module.exports={
    enviarEmail,
    enviarEmailSimple,
    enviarNotificacion,
    getAccessToken, 
    syncCalendar,
    addEvent,
    getTokenByCode,
    deleteEvent
}