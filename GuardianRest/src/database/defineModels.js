const EdificioDatos = require('../models/Edificio');
const ServicioLocalDatos = require('../models/ServicioLocal');
const UbicacionDatos = require('../models/Ubicacion');
const TipoServicioDatos = require('../models/TipoServicio');
const ServicioDatos = require('../models/Servicio');
const GuardiaDatos = require('../models/Guardia');
const GuardiaMedicoDatos = require('../models/GuardiaMedico');
const ServicioDomicilioDatos = require('../models/ServicioDomicilio');
const MedicoDatos = require('../models/Medico');
const EspecialidadMedicoDatos = require('../models/EspecialidadMedico');
const ZonaDatos = require('../models/Zona');
const EspecialidadDatos = require('../models/Especialidad');
const EspecialidadServicioDatos = require('../models/EspecialidadServicio');
const GuardiaMedicoPostulacionDatos = require('../models/GuardiaMedicoPostulacion');
const UsuarioDatos = require('../models/Usuario');
const AdminDatos = require('../models/Admin');
const AdministrativoDatos = require('../models/Administrativo');
const EventualidadDatos = require('../models/Eventualidad');
const CalendarTokenDatos = require('../models/CalendarToken');
const { getMigrator } = require('./migrator');
const { actualizarTiempos } = require('../helpers/TimerCierreGuardia');
require('./pgEnum-fix')


/*
  En esta funcion dada una conexion de sequelize recibida por parámetro, se le definen los distintos modelos del sistema y sus relaciones.
  Anteriormente esto lo hacíamos en los distintos archivos de modelo, pero ese método solo aplica cuando tenemos una conexion de sequelize única.
  Para aprovechar los archivos de modelos ya creados, lo que se hizo fue definir los atributos y opciones que va a llevar el archivo de modelo e importarlos para usarlos en la definición de estos (los distintos define en la funcion agregarModelos())
*/

async function agregarModelos(sequelize){

  const Usuario = await sequelize.define('Usuario', UsuarioDatos.atributos, UsuarioDatos.opciones);
  const Edificio = await sequelize.define('Edificio',EdificioDatos.atributos,EdificioDatos.opciones);
  const Ubicacion = await sequelize.define('Ubicacion',UbicacionDatos.atributos ,UbicacionDatos.opciones);
  const ServicioLocal = await sequelize.define('ServicioLocal', ServicioLocalDatos.atributos, ServicioLocalDatos.opciones);
  const TipoServicio = await sequelize.define('TipoServicio', TipoServicioDatos.atributos, TipoServicioDatos.opciones);
  const Servicio = await sequelize.define('Servicio', ServicioDatos.atributos, ServicioDatos.opciones);
  const Guardia = await sequelize.define('Guardia', GuardiaDatos.atributos, GuardiaDatos.opciones);
  const GuardiaMedico = await sequelize.define('GuardiaMedico', GuardiaMedicoDatos.atributos, GuardiaMedicoDatos.opciones);
  const ServicioDomicilio = await sequelize.define('ServicioDomicilio', ServicioDomicilioDatos.atributos, ServicioDomicilioDatos.opciones);
  const Medico = await sequelize.define('Medico', MedicoDatos.atributos, MedicoDatos.opciones);
  const EspecialidadMedico = await sequelize.define('EspecialidadMedico', EspecialidadMedicoDatos.atributos, EspecialidadMedicoDatos.opciones);
  const Zona = await sequelize.define('Zona', ZonaDatos.atributos, ZonaDatos.opciones);
  const Especialidad = await sequelize.define('Especialidad', EspecialidadDatos.atributos, EspecialidadDatos.opciones);
  const EspecialidadServicio = await sequelize.define('EspecialidadServicio', EspecialidadServicioDatos.atributos, EspecialidadServicioDatos.opciones);
  const GuardiaMedicoPostulacion = await sequelize.define('GuardiaMedicoPostulacion', GuardiaMedicoPostulacionDatos.atributos, GuardiaMedicoPostulacionDatos.opciones);
  const Admin = await sequelize.define('Admin', AdminDatos.atributos, AdminDatos.opciones);
  const Administrativo = await sequelize.define('Administrativo', AdministrativoDatos.atributos, AdministrativoDatos.opciones);
  const Eventualidad = await sequelize.define('Eventualidad', EventualidadDatos.atributos, EventualidadDatos.opciones);
  const CalendarToken = await sequelize.define('CalendarToken',CalendarTokenDatos.atributos, CalendarTokenDatos.opciones);

  //Relaciones de Edificio
  Edificio.hasMany(Ubicacion, {foreignKey: 'idedificio'});
  Edificio.hasMany(ServicioLocal, {foreignKey: 'idedificio'});

  //Relaciones de Ubicacion
  Ubicacion.belongsTo(Edificio, {foreignKey: 'idedificio'});
  Ubicacion.hasOne(ServicioLocal, {foreignKey: 'idubicacion'});

  //Relaciones de Especialidad
  Especialidad.hasMany(GuardiaMedicoPostulacion, {foreignKey: 'especialidad'});
  Especialidad.belongsToMany(Servicio,  { through: EspecialidadServicio, foreignKey: 'idespecialidad'});
  Especialidad.belongsToMany(Medico,  { through: EspecialidadMedico, foreignKey: 'idespecialidad'});
  Especialidad.hasMany(Eventualidad,{foreignKey:'idespecialidad'});

  //Relaciones de GuardiaMedicoPostulacion
  GuardiaMedicoPostulacion.belongsTo(Especialidad, {foreignKey: 'especialidad'});
  GuardiaMedicoPostulacion.belongsTo(Medico, {foreignKey: 'idmedico'});

  //Relaciones de Medico
  Medico.hasMany(GuardiaMedicoPostulacion, {foreignKey: 'idmedico'});
  Medico.belongsToMany(Guardia,  { through: GuardiaMedico, foreignKey: 'idmedico', as:'Asignacion' }); 
  Medico.belongsToMany(Guardia,  { through: GuardiaMedicoPostulacion, foreignKey: 'idmedico', as:'Postulacion' }); 
  Medico.belongsTo(Usuario, {foreignKey: 'id'});
  Medico.belongsToMany(Especialidad,  { through: EspecialidadMedico, foreignKey: 'idmedico'}); 
  Medico.hasMany(Eventualidad, {foreignKey: 'idmedico'});
  Medico.belongsTo(Zona, {foreignKey: 'idzona'});
  Medico.hasOne(CalendarToken,{ foreignKey: 'idmedico'})
  CalendarToken.belongsTo(Medico,{ foreignKey: 'idmedico'})

  //Relaciones de Servicio
  Servicio.hasOne(ServicioLocal,{ foreignKey: 'id', as:'Local'});
  Servicio.hasMany(Guardia, {foreignKey: 'idservicio'});
  Servicio.hasOne(ServicioDomicilio,{ foreignKey: 'id', as:'Domicilio'});
  Servicio.belongsToMany(Especialidad,  { through: EspecialidadServicio, foreignKey: 'idservicio'}); 

  //Relaciones de ServicioLocal
  ServicioLocal.belongsTo(Servicio,{foreignKey: 'id'});
  ServicioLocal.belongsTo(TipoServicio, {foreignKey: 'idtipo'});
  ServicioLocal.belongsTo(Ubicacion, {foreignKey: 'idubicacion'});
  ServicioLocal.belongsTo(Edificio, {foreignKey: 'idedificio'})
  
  //Relaciones de Guardia
  Guardia.belongsTo(Servicio, {foreignKey: 'idservicio'});
  Guardia.belongsToMany(Medico,  { through: GuardiaMedico, foreignKey: 'idguardia', as:'Asignacion' });
  Guardia.belongsToMany(Medico,  { through: GuardiaMedicoPostulacion, foreignKey: 'idguardia', as:'Postulacion'});
  Guardia.hasMany(Eventualidad,{foreignKey: 'idguardia'});

  //Relaciones de ServicioDomicilio
  ServicioDomicilio.belongsTo(Servicio,{foreignKey: 'id'});
  ServicioDomicilio.belongsTo(Zona, {foreignKey: 'idzona'});
  
  //Relaciones de Zona
  Zona.hasMany(ServicioDomicilio, {foreignKey: 'idzona'});
  Zona.hasMany(Medico,{foreignKey: 'idzona'});

  //Relaciones de TipoServicio
  TipoServicio.hasMany(ServicioLocal, {foreignKey: 'idtipo'});

  //Relaciones de Usuario
  Usuario.hasOne(Admin, {foreignKey: 'id'});
  Usuario.hasOne(Administrativo, {foreignKey: 'id'});
  Usuario.hasOne(Medico, {foreignKey: 'id'});

  //Relaciones Admin
  Admin.belongsTo(Usuario, {foreignKey: 'id'});
  
  //Relaciones Administrativo
  Administrativo.belongsTo(Usuario, {foreignKey: 'id'});

  //Relaciones Eventualidad
  Eventualidad.belongsTo(Medico, {foreignKey: 'idmedico'});
  Eventualidad.belongsTo(Guardia, {foreignKey: 'idguardia'});
  Eventualidad.belongsTo(Especialidad, {foreignKey: 'idespecialidad'});

  const umzug = getMigrator(sequelize);
  await umzug.up({
    migrations:["CreacionTablas1.js"],
    rerun: "ALLOW",
  });

  actualizarTiempos(Guardia);

}

module.exports={
    agregarModelos
}