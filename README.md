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
    
      ```
      
        DB_HOST=<DB_HOST> --> Host del servidor de base de datos postgres(en caso de estar en un entorno local es localhost)
        DB_PORT=<DB_PORT> --> Puerto del servidor de base de datos postgres(el puerto por defecto de PostgreSQL es 5432)
        DB_NAME=<DB_NAME> --> Nombre de la base de datos a utilizar
        DB_USER=<DB_USER> --> Usuario de postgres a utilizar
        DB_PASS=<DB_PASS> --> Contraseña del usuario de postgres indicado
        DB_SSL=TRUE/FALSE --> Indicacion de si se debe realizar la conexion de base de datos mediante SSL(Para entornos locales deberia ser FALSE)
        
        Estas variables de entorno especifican los datos necesarios para la conexion de la base de datos
      ```
      ```
      
        PAYPAL_CLIENT_ID=<PAYPAL_CLIENT_ID>
        PAYPAL_CLIENT_SECRET=<PAYPAL_CLIENT_SECRET>
        PAYPAL_WEBHOOK_ID=<PAYPAL_WEBHOOK_ID>
        
        Estas variables de entorno representan la informacion necesaria para la conexion con PayPal. https://developer.paypal.com/developer/applications 
      ```
      ```
      
        NOTIFICATIONS=TRUE
        
        Indica si las notificaciones del sistema estan activadas.
      ```
      ```
      
        FRONTEND_URL=<FRONTEND_URL>
        
        Url del Frontend de la aplicacion, en caso de ejecutar el Front de forma local en el puerto por defecto de angular, la url seria: http://localhost:4200
      ```

      ```
      
        TWILIO_SENDER_EMAIL=<TWILIO_SENDER_EMAIL> --> Direccion de correo electronico que se utlizara para enviar los correos de notificacion
        TWILIO_SENDER_PASSWORD=<TWILIO_SENDER_PASSWORD> --> Contraseña del correo electronico indicado.
        TWILIO_ACCOUNT_SID=<TWILIO_ACCOUNT_SID> --> Credencial de la cuenta de Twilio (Se obtiene desde el dashboard de Twilio)
        TWILIO_AUTH_TOKEN=<TWILIO_AUTH_TOKEN> --> Credencial de la cuenta de Twilio (Se obtiene desde el dashboard de Twilio)
        TWILIO_WHATSAPP_PHONE=<TWILIO_WHATSAPP_PHONE> --> Numero de telefono de twilio (correspondiente al sandbox de whatsapp) a utilizar para enviar notificaciones por Whatsapp.
        TWILIO_MESSAGING_SERVICE_ID=<TWILIO_MESSAGING_SERVICE_ID> --> Id del servicio de mensajeria de Twilio a utilizar. (SMS)
      
        Estas variables de entorno representan la informacion necesaria para la conexion y funcionamiento de twilio.
      ```
    
  * GuardianFront(Las variables se indican en el archivo (environment.prod.ts, ubicado en /src/environments):
    ``` 

      BACKEND_URL:<<BACKEND_URL>>, --> Url donde esta publicada la aplicacion(en un entorno local seria http://localhost:5000)
      PAYPAL_PLAN_ID:<<PLAN_ID>>, --> Id del Plan de suscripcion de PayPal creado para la aplicacion (Ver configuracion de PayPal)
      PAYPAL_CLIENT_ID:<<CLIENT_ID>>, --> Client Id de la aplicacion de PayPal correspondiente. Debe ser el mismo que se configuro en el backend(Ver configuracion de PayPal)
    ```
  
4. Ejecutar ambos proyectos:
  ``` 
    npm start
  ```
  
  
  
_Finaliza con un ejemplo de cómo obtener datos del sistema o como usarlos para una pequeña demo_

## Cofiguracion de PayPal ⚙️

_Instruccionen para establecer el flujo de trabajo correspondiente a paypal de forma local_

1. Crear una cuenta para desarrolladores en PayPal. https://developer.paypal.com/docs/get-started/
2. Una vez creada la aplicacion nos podremos loguear al dashboard de desarrollador de PayPal.
3. Dentro del dashboard tendremos que crear una aplicacion nueva en la seccion "My Apps & Credentials".(En caso de ser necesario se debe crear una cuenta Sandbox de PayPal en la seccion "Accounts").
![image](https://user-images.githubusercontent.com/64421944/144615808-d22211d3-5f8c-4267-aa42-b1e95c65b7ba.png)
5. Una vez creada la aplicacion, tendremos acceso a las credenciales requeridas(CLIENT_ID, CLIENT_SECRET), estas son las que deben ser ingresadas en las variables de entorno correspondientes.
![image](https://user-images.githubusercontent.com/64421944/144615254-522a5120-3b1c-465e-b896-ba936be48b06.png)
6. 
7. 
  * Luego de creada la aplicacion de PayPal tendremos que crear un Webhook, el que se encargara de avisar a nuestra app mediante una peticion http a un endpoint de <ins>nuestra</ins> aplicacion cuando el pago de la suscripcion de una institucion se complete satisfactoriamente, para darla de alta en el sistema. https://developer.paypal.com/docs/api-basics/notifications/webhooks/
  * Debido a que en los Webhook de PayPal solo se le pueden configurar endpoints con el protocolo https(entre otros requerimientos), decidimos usar la herramienta <ins>Ngrok</ins> para redirigir los Webhooks a nuestra aplicacion que esta funcionando de forma local. Esto se hace de la siguiente forma(En nuestro caso usando la consola de PowerShell): 
  * Iniciar la consola en la ubicacion donde se encuentra el archivo de Ngrok descargado:
    ![image](https://user-images.githubusercontent.com/64421944/144619707-4639436d-20b4-47c2-9969-194c88c5f629.png)
  * Una vez en la consola ingresar el siguiente comando(Siendo 5000 el puerto donde se encuentra la aplicacion):
    ```
      ./ngrok http 5000 
    ```
  * Deberia aparecer una pantalla similar a la siguiente:
    ![image](https://user-images.githubusercontent.com/64421944/144620294-4af291cb-0430-4d0f-b14d-699c69fa1444.png)
  
  * El link que vamos a utilizar para el Webhook de PayPal es el que utiliza el protocolo https, como se muestra en la siguiente imagen:
    ![image](https://user-images.githubusercontent.com/64421944/144620824-4aa49041-43d6-483e-aa8f-a2c411029330.png)
  
  * Una vez que tengamos este link volveremos al dashboard de PayPal, a la seccion de Sandbox Webhooks, en la misma pantalla en la que se encuentran las credenciales. Seleccionaremos la opcion "Add webhook" e ingresaremos en el campo "Webhook URL" el link https obtenido **mas la ruta del endpoint que es "/api/payment/authorizepayment", es decir el link deberia quedar de la siguiente manera: "https://7bd9-167-108-249-30.ngrok.io/api/payment/authorizepayment"**.  Luego se debe seleccionar los eventos por los que PayPal nos enviara informacion, en nuestro caso el unico que necesitamos es "Billing subscription activated".
    ![image](https://user-images.githubusercontent.com/64421944/144622746-9fa701c7-8ec6-4dfb-9aee-173354dcd525.png)
  * Una vez guardado los cambios, la aplicacion esta lista para recibir la informacion desde PayPal.

8. Una vez que tengamos el webhook correctamente configurado, procederemos a crear el plan de suscripcion deseado a usar en la aplicacion.
  8.1. Para esto tendremos que iniciar sesion en https://www.sandbox.paypal.com/ **con la cuenta sandbox utilizada para la creacion de la aplicacion de PayPal**.
  8.2. Una vez ahi nos dirigiremos al centro de aplicaciones:
    ![image](https://user-images.githubusercontent.com/64421944/144624204-663ce3f0-7dca-47bd-8ed9-2824c3f69766.png)
  8.3. Seleccionaremos la opcion "Suscripciones":
    ![image](https://user-images.githubusercontent.com/64421944/144624548-4f68b057-0381-43fe-867a-25c51a0db4a6.png)
  8.4. En la seccion de "Planes de suscripcion" seleccionaremos crear un plan:
    ![image](https://user-images.githubusercontent.com/64421944/144624724-7a8fe7fe-9a16-46e5-aab2-7907474eeb54.png)
  8.5. Para crear el plan de suscripcion necesitaremos crear un producto. Luego de completado sus datos seguiremos con la creacion del plan de suscripcion indicando entre otros datos la forma y cantidad que se cobrara a los clientes.(En nuestro caso seleccionamos "Precio fijo" sin periodo de prueba, con cobros mensuales).
    ![image](https://user-images.githubusercontent.com/64421944/144626611-b4c4b8e9-ddd7-4c7f-bb37-171ab0a0ecf5.png)
  8.6. Una vez creado el plan de suscripcion, podremos ver su ID. **Este ID es el que se usara en las variables de entorno de GuardianFront**:
    ![image](https://user-images.githubusercontent.com/64421944/144627304-8c2ff311-1ec9-44c0-848d-5d1fe44ee4d7.png)
 
 9. Una vez aplicadas correctamente las configuraciones anteriores la aplicacion esta lista para realizar el flujo de PayPal correctamente.


    
  
  
  

  

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
