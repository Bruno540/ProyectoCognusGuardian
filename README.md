# Proyecto Guardian

Sistema de gesti贸n de guardias asistenciales para instituciones m茅dicas.

## Comenzando 馃殌

_Las siguientes instrucciones permitir谩n obtener una copia del proyecto en funcionamiento de forma local para prop贸sitos de desarrollo y pruebas._

## Pre-requisitos 馃搵

_Para el funcionamiento de la aplicaci贸n se necesitaran los  siguientes recursos:_

* Cuenta de PayPal para desarrolladores - https://developer.paypal.com/docs/get-started/
* Cuenta de Google Cloud para sincronizaci贸n con Google Calendar - https://console.cloud.google.com/freetrial/signup/tos
* Cuenta de Twilio para el env铆o de notificaciones - https://www.twilio.com/try-twilio
* Ngrok - https://ngrok.com/download
* PostgresSQL - https://www.postgresql.org/download/

## Instalaci贸n 馃敡

_Pasos a seguir para la ejecuci贸n de la aplicaci贸n:_

1. Clonar la rama main del repositorio.

2. Instalar las dependencias necesarias en ambos proyectos(GuardianFront y GuardianRest):

```
npm install
```
3. Configurar las variables de entorno en ambos proyectos: 

    * GuardianRest(se deben establecer las variables de entorno en un archivo .env en la ra铆z del proyecto:): 

        ```

          DB_HOST=<DB_HOST> --> Host del servidor de base de datos postgres(en caso de estar en un entorno local es localhost)
          DB_PORT=<DB_PORT> --> Puerto del servidor de base de datos postgres(el puerto por defecto de PostgreSQL es 5432)
          DB_NAME=<DB_NAME> --> Nombre de la base de datos a utilizar
          DB_USER=<DB_USER> --> Usuario de postgres a utilizar
          DB_PASS=<DB_PASS> --> Contrase帽a del usuario de postgres indicado
          DB_SSL=TRUE/FALSE --> Indicaci贸n de si se debe realizar la conexi贸n de base de datos mediante SSL(Para entornos locales deberia ser FALSE)

          Estas variables de entorno especifican los datos necesarios para la conexi贸n de la base de datos
        ```
        ```

          PAYPAL_CLIENT_ID=<PAYPAL_CLIENT_ID>
          PAYPAL_CLIENT_SECRET=<PAYPAL_CLIENT_SECRET>
          PAYPAL_WEBHOOK_ID=<PAYPAL_WEBHOOK_ID>

          Estas variables de entorno representan la informacion necesaria para la conexi贸n con PayPal. https://developer.paypal.com/developer/applications 
        ```
        ```

          NOTIFICATIONS=TRUE

          Indica si las notificaciones del sistema estan activadas.
        ```
        ```

          FRONTEND_URL=<FRONTEND_URL>

          Url del Frontend de la aplicaci贸n, en caso de ejecutar el Front de forma local en el puerto por defecto de angular, la url seria: http://localhost:4200
        ```

        ```

          NODE_SENDER_EMAIL=<NODE_SENDER_EMAIL> --> Direcci贸n de correo electronico que se utlizar谩 para enviar los correos de notificaci贸n
          NODE_SENDER_PASSWORD=<NODE_SENDER_PASSWORD> --> Contrase帽a del correo electr贸nico indicado.
          
          TWILIO_ACCOUNT_SID=<TWILIO_ACCOUNT_SID> --> Credencial de la cuenta de Twilio (Se obtiene desde el dashboard de Twilio)
          TWILIO_AUTH_TOKEN=<TWILIO_AUTH_TOKEN> --> Credencial de la cuenta de Twilio (Se obtiene desde el dashboard de Twilio)
          TWILIO_WHATSAPP_PHONE=<TWILIO_WHATSAPP_PHONE> --> N煤mero de tel茅fono de twilio (correspondiente al sandbox de whatsapp) a utilizar para enviar notificaciones por Whatsapp. Sin espacios
          TWILIO_MESSAGING_SERVICE_ID=<TWILIO_MESSAGING_SERVICE_ID> --> Id del servicio de mensajeria de Twilio a utilizar. (SMS)

          Estas variables de entorno representan la informaci贸n necesaria para la conexi贸n y funcionamiento de twilio.
        ```

    * GuardianFront(Las variables se indican en el archivo (environment.prod.ts, ubicado en /src/environments):
      ``` 

        BACKEND_URL:<<BACKEND_URL>>, --> Url donde esta publicada la aplicaci贸n(en un entorno local seria http://localhost:5000)
        PAYPAL_PLAN_ID:<<PLAN_ID>>, --> Id del Plan de suscripci贸n de PayPal creado para la aplicaci贸n (Ver configuraci贸n de PayPal)
        PAYPAL_CLIENT_ID:<<CLIENT_ID>>, --> Client Id de la aplicacion de PayPal correspondiente. Debe ser el mismo que se configuro en el backend(Ver configuraci贸n de PayPal)
      ```
4. Copiar las credenciales de Google Cloud en el archivo "credentials.json" en el backend de la aplicaci贸n(GuardianRest). Ver configuraci贸n de Google Cloud.

5. Crear la base de datos indicada en las variables de entorno.(La base de datos debe contar un schema "public").

6. Ejecutar ambos proyectos:
  ``` 
    npm start
  ```
  
  
## Configuraci贸n de PayPal 鈿欙笍

_Instrucciones para establecer el flujo de trabajo correspondiente a PayPal de forma local_

1. Crear una cuenta para desarrolladores en PayPal. https://developer.paypal.com/docs/get-started/
2. Una vez creada la aplicaci贸n nos podremos loguear al dashboard de desarrollador de PayPal.
3. Dentro del dashboard tendremos que crear una aplicaci贸n nueva en la secci贸n "My Apps & Credentials".(En caso de ser necesario se debe crear una cuenta Sandbox de PayPal en la secci贸n "Accounts").
![image](https://user-images.githubusercontent.com/64421944/144615808-d22211d3-5f8c-4267-aa42-b1e95c65b7ba.png)
5. Una vez creada la aplicaci贸n, tendremos acceso a las credenciales requeridas(CLIENT_ID, CLIENT_SECRET), estas son las que deben ser ingresadas en las variables de entorno correspondientes.
![image](https://user-images.githubusercontent.com/64421944/144615254-522a5120-3b1c-465e-b896-ba936be48b06.png)
6. Luego de creada la aplicaci贸n de PayPal tendremos que crear un Webhook, el que se encargara de avisar a nuestra app mediante una petici贸n http a un endpoint de <ins>nuestra</ins> aplicaci贸n cuando el pago de la suscripci贸n de una instituci贸n se complete satisfactoriamente, para darla de alta en el sistema. https://developer.paypal.com/docs/api-basics/notifications/webhooks/
    
    * Debido a que en los Webhook de PayPal solo se le pueden configurar endpoints con el protocolo https(entre otros requerimientos), decidimos usar la herramienta <ins>Ngrok</ins> para redirigir los Webhooks a nuestra aplicaci贸n que esta funcionando de forma local. Esto se hace de la siguiente forma(En nuestro caso usando la consola de PowerShell): 
    * Iniciar la consola en la ubicaci贸n donde se encuentra el archivo de Ngrok descargado:
      ![image](https://user-images.githubusercontent.com/64421944/144619707-4639436d-20b4-47c2-9969-194c88c5f629.png)
    * Una vez en la consola ingresar el siguiente comando(Siendo 5000 el puerto donde se encuentra la aplicaci贸n):
      ```
        ./ngrok http 5000 
      ```
    * Deber铆a aparecer una pantalla similar a la siguiente:
      ![image](https://user-images.githubusercontent.com/64421944/144620294-4af291cb-0430-4d0f-b14d-699c69fa1444.png)

    * El link que vamos a utilizar para el Webhook de PayPal es el que utiliza el protocolo https, como se muestra en la siguiente imagen:
      ![image](https://user-images.githubusercontent.com/64421944/144620824-4aa49041-43d6-483e-aa8f-a2c411029330.png)

    * Una vez que tengamos este link volveremos al dashboard de PayPal, a la secci贸n de Sandbox Webhooks, en la misma pantalla en la que se encuentran las credenciales. Seleccionaremos la opci贸n "Add webhook" e ingresaremos en el campo "Webhook URL" el link https obtenido **mas la ruta del endpoint que es "/api/payment/authorizepayment", es decir el link deber铆a quedar de la siguiente manera: "https://7bd9-167-108-249-30.ngrok.io/api/payment/authorizepayment"**.  Luego se debe seleccionar los eventos por los que PayPal nos enviar谩 informaci贸n, en nuestro caso el 煤nico que necesitamos es "Billing subscription activated".
      ![image](https://user-images.githubusercontent.com/64421944/144622746-9fa701c7-8ec6-4dfb-9aee-173354dcd525.png)
    * Una vez guardado los cambios, podremos acceder al **ID del webhook, el cual tambi茅n debe configurarse en las variables de entorno del Backend**.
8. Una vez que tengamos el webhook correctamente configurado, procederemos a crear el plan de suscripci贸n deseado a usar en la aplicaci贸n.
    * Para esto tendremos que iniciar sesi贸n en https://www.sandbox.paypal.com/ **con la cuenta sandbox utilizada para la creaci贸n de la aplicaci贸n de PayPal**.
    * Una vez ah铆 nos dirigiremos al centro de aplicaciones:
      ![image](https://user-images.githubusercontent.com/64421944/144624204-663ce3f0-7dca-47bd-8ed9-2824c3f69766.png)
    * Seleccionaremos la opci贸n "Suscripciones":
      ![image](https://user-images.githubusercontent.com/64421944/144624548-4f68b057-0381-43fe-867a-25c51a0db4a6.png)
    * En la secci贸n de "Planes de suscripci贸n" seleccionaremos crear un plan:
      ![image](https://user-images.githubusercontent.com/64421944/144624724-7a8fe7fe-9a16-46e5-aab2-7907474eeb54.png)
    * Para crear el plan de suscripci贸n necesitaremos crear un producto. Luego de completado sus datos seguiremos con la creaci贸n del plan de suscripci贸n indicando entre otros datos la forma y cantidad que se cobrara a los clientes.(En nuestro caso seleccionamos "Precio fijo" sin periodo de prueba, con cobros mensuales).
      ![image](https://user-images.githubusercontent.com/64421944/144626611-b4c4b8e9-ddd7-4c7f-bb37-171ab0a0ecf5.png)
    * Una vez creado el plan de suscripci贸n, podremos ver su ID. **Este ID es el que se usara en las variables de entorno de GuardianFront**:
      ![image](https://user-images.githubusercontent.com/64421944/144627304-8c2ff311-1ec9-44c0-848d-5d1fe44ee4d7.png)
 
9. Una vez aplicadas correctamente las configuraciones anteriores la aplicaci贸n esta lista para realizar el flujo de PayPal de forma completa.

## Configuraci贸n de Google Cloud 鈿欙笍

1. En la consola de Google Cloud abrir el men煤 lateral seleccionar la opci贸n "API y Servicios".
2. En el **panel** seleccionar la opci贸n "Habilitar API y Servicios".
3. Seleccionar y habilitar la API de Google Calendar.
4. Una vez habilitada, habr谩 que configurar la pantalla de consentimiento: 
   * Se ingresaran datos como nombre de la aplicaci贸n, correos de contacto.
   * Luego se agregaran los siguientes permisos: 
      - ./auth/userinfo.email
      - ./auth/userinfo.profile
      - openid
      - ./auth/calendar.app.created
      - ./auth/cloud-platform
      - ./auth/calendar.events
   * Mientras el estado de publicaci贸n sea 鈥淧rueba鈥?, solo los usuarios de prueba podr谩n acceder a la app, agregar los usuarios deseados.
 5. Una vez configurada la pantalla de consentimiento de la aplicaci贸n se deber谩 crear una nueva credencial de clientes OAuth 2.0;
   * Seleccionar en el men煤 lateral la opci贸n "Credenciales"
   * Seleccionar la opci贸n "Crear credenciales" --> "ID del cliente OAuth 2.0"
   * Seleccionar aplicaci贸n web
   * Ingresar Or铆genes autorizados(en este caso en un entorno local el origen seria http://localhost:5000, siendo 5000 el puerto en que se encuentra nuestro back)
   * Ingresar Urls de redireccionamiento autorizados. En esta opci贸n se agregara la url donde se encuentre el Frontend de la aplicaci贸n, **mas el endpoint component/successcalendarsync**, en un entorno local un ejemplo de url seria el siguiente: http://localhost:4200/component/successcalendarsync.
6. Una vez creado el cliente de OAuth2 se tendr谩 acceso a sus credenciales.
7. Descargar las credenciales generadas (archivo JSON) y **copiar su contenido en el archivo "credentials" que se encuentra en el backend de nuestra aplicaci贸n (GuardianRest)**.

## Notas importantes 馃敥

1. La cuenta de Gmail para enviar correos con nuestra aplicaci贸n(NODE_SENDER_EMAIL) debe permitir el acceso de aplicaciones poco seguras. https://www.google.com/settings/security/lesssecureapps
2. La cuenta gratis de **Ngrok** no permite el uso de links fijos, por lo que si se cierra la ventana de Ngrok y se vuelve a abrir el link https generado habr谩 cambiado, por lo que habr谩 que repetir el procedimiento realizado en el paso 6 de la configuraci贸n de PayPal(modificando el webhook anteriormente creado).
3. La credencial "Auth token" de **Twilio** puede cambiar en el tiempo.
4. Para obtener el numero de WhatsApp y el MessagingID de twilio se deben seguir los pasos indicados en la consola de twilio, en la secci贸n "messaging/Try it out", "Send a sms" y "Send a whatsapp message".
5. Para que twilio pueda enviar notificaciones los n煤meros destinatarios deben estar registrados.(Free trial).
6. El proceso de registro luego de la suscripci贸n de PayPal puede tardar unos minutos.

## Autores 鉁掞笍

* **Bruno Rodr铆guez** - [Bruno](https://github.com/Bruno540)
* **Germ谩n Arena** - [German](https://github.com/gac1989)
* **Pablo Gaione** - [Pablo](https://github.com/pablogb83)

---

