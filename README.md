# Proyecto Guardian

Sistema de gestion de guardias asistenciales para instituciones medicas.

## Comenzando 🚀

_Las siguientes instrucciones permitirán obtener una copia del proyecto en funcionamiento de forma local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Para el funcionamiento de la aplicacion se necesitaran los  siguientes recursos:_

```
Cuenta de paypal para desarrolladores - https://developer.paypal.com/docs/get-started/
Cuenta de Google Cloud para sincronizacion con Google Calendar - https://console.cloud.google.com/freetrial/signup/tos
Cuenta de Twilio para el envio de notificaciones - https://www.twilio.com/try-twilio
Ngrok - https://ngrok.com/download
PostgresSQL - https://www.postgresql.org/download/
```

### Instalación 🔧

_Pasos a seguir para la ejecucion de la aplicacion:_

1. Clonar la rama main del repositorio.

2. Instalar las dependencias necesarias en ambos proyectos(GuardianFront y GuardianRest):

```
npm install
```
3. Configurar las variables de entorno en ambos proyectos: 
  
  * GuardianRest(se deben establecer las variables de entorno en un archivo .env en la raiz del proyecto:): 
    
      ...
      
        DB_HOST=<DB_HOST> --> Host del servidor de base de datos postgres(en caso de estar en un entorno local es localhost)
        DB_PORT=<DB_PORT> --> Puerto del servidor de base de datos postgres(el puerto por defecto de PostgreSQL es 5432)
        DB_NAME=<DB_NAME> --> Nombre de la base de datos a utilizar
        DB_USER=<DB_USER> --> Usuario de postgres a utilizar
        DB_PASS=<DB_PASS> --> Contraseña del usuario de postgres indicado
        DB_SSL=TRUE/FALSE --> Indicacion de si se debe realizar la conexion de base de datos mediante SSL(Para entornos locales deberia ser FALSE)
        
        Estas variables de entorno especifican los datos necesarios para la conexion de la base de datos
      ...
      ...
      
        PAYPAL_CLIENT_ID=<PAYPAL_CLIENT_ID>
        PAYPAL_CLIENT_SECRET=<PAYPAL_CLIENT_SECRET>
        PAYPAL_WEBHOOK_ID=<PAYPAL_WEBHOOK_ID>
        
        Estas variables de entorno representan la informacion necesaria para la conexion con PayPal. https://developer.paypal.com/developer/applications 
      ...
      ...
      
        NOTIFICATIONS=TRUE
        
        Indica si las notificaciones del sistema estan activadas.
      ...
      ...
      
        FRONTEND_URL=<FRONTEND_URL>
        
        Url del Frontend de la aplicacion, en caso de ejecutar el Front de forma local en el puerto por defecto de angular, la url seria: http://localhost:4200
      ...

      ...
      
        TWILIO_SENDER_EMAIL=<TWILIO_SENDER_EMAIL> --> Direccion de correo electronico que se utlizara para enviar los correos de notificacion
        TWILIO_SENDER_PASSWORD=<TWILIO_SENDER_PASSWORD> --> Contraseña del correo electronico indicado.
        TWILIO_ACCOUNT_SID=<TWILIO_ACCOUNT_SID> --> Credencial de la cuenta de Twilio (Se obtiene desde el dashboard de Twilio)
        TWILIO_AUTH_TOKEN=<TWILIO_AUTH_TOKEN> --> Credencial de la cuenta de Twilio (Se obtiene desde el dashboard de Twilio)
        TWILIO_WHATSAPP_PHONE=<TWILIO_WHATSAPP_PHONE> --> Numero de telefono de twilio (correspondiente al sandbox de whatsapp) a utilizar para enviar notificaciones por Whatsapp.
        TWILIO_MESSAGING_SERVICE_ID=<TWILIO_MESSAGING_SERVICE_ID> --> Id del servicio de mensajeria de Twilio a utilizar. (SMS)
      
        Estas variables de entorno representan la informacion necesaria para la conexion y funcionamiento de twilio.
      ...
    
    * GuardianFront(Las variables se indican en el archivo (environment.prod.ts, ubicado en /src/environments):
      ... 
      
        BACKEND_URL:<<BACKEND_URL>>, --> Url donde esta publicada la aplicacion(en un entorno local seria http://localhost:5000)
        PAYPAL_PLAN_ID:<<PLAN_ID>>, --> Id del Plan de suscripcion de PayPal creado para la aplicacion (Ver configuracion de PayPal)
        PAYPAL_CLIENT_ID:<<CLIENT_ID>>, --> Client Id de la aplicacion de PayPal correspondiente. Debe ser el mismo que se configuro en el backend(Ver configuracion de PayPal)
      ...
  
4. Ejecutar ambos proyectos:
  ... 
    npm start
  ...
  
  
  
_Finaliza con un ejemplo de cómo obtener datos del sistema o como usarlos para una pequeña demo_

## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/villanuevand/xxxxxx) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Andrés Villanueva** - *Trabajo Inicial* - [villanuevand](https://github.com/villanuevand)
* **Fulanito Detal** - *Documentación* - [fulanitodetal](#fulanito-de-tal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.



---
⌨️ con ❤️ por [Villanuevand](https://github.com/Villanuevand) 😊
