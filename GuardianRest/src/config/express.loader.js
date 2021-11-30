const bodyParser = require( "body-parser" );
const express = require( "express" );
const morgan = require( "morgan" );
const path = require( "path" );
let cors = require('cors')
const routes = require('../routes/index');


require('../models/Institucion');
require('../models/Suscripcion');
require('../models/audit');

class ExpressLoader {
  constructor () {
    const app = express();

    global.semana = 604800000;

    // Contenido estatico
    app.use('/uploads',express.static(path.resolve('uploads')));

    // Middleware
    app.use(morgan('dev'));

    app.use(express.json());
    
    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.urlencoded({ extended: false }));

    //Rutas de la aplicacion
    app.use('/api', routes);

    this.server = app;

  }

  get Server () {
    return this.server;
  }


}

module.exports = ExpressLoader;