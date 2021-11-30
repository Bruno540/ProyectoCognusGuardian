'use strict';

const Usuario = require("../src/models/Usuario");
const Guardia = require("../src/models/Guardia");
const Servicio = require("../src/models/Servicio");
const Admin = require("../src/models/Admin");
const Administrativo = require("../src/models/Administrativo");
const Edificio = require("../src/models/Edificio");
const Especialidad = require("../src/models/Especialidad");
const EspecialidadMedico = require("../src/models/EspecialidadMedico");
const Medico = require("../src/models/Medico");
const EspecialidadServicio = require("../src/models/EspecialidadServicio");
const GuardiaMedico = require("../src/models/GuardiaMedico");
const GuardiaMedicoPostulacion = require("../src/models/GuardiaMedicoPostulacion");
const ServicioLocal = require("../src/models/ServicioLocal");
const ServicioDomicilio = require("../src/models/ServicioDomicilio");
const TipoServicio = require("../src/models/TipoServicio");
const Ubicacion = require("../src/models/Ubicacion");
const Zona = require("../src/models/Zona");
const Eventualidad = require("../src/models/Eventualidad");
const CalendarToken = require("../src/models/CalendarToken");

module.exports = {
  up: async (queryInterface) => {
    try{
      await queryInterface.createDatabase(process.env.DB_NAME)
    }
    catch(e){
    }
    const schema = queryInterface.sequelize.options.schema;
    await queryInterface.createTable('zona', Zona.atributos,{schema: schema});
    await queryInterface.createTable('usuario', Usuario.atributos,{schema: schema});
    await queryInterface.createTable('administrador', Admin.atributos,{schema: schema});
    await queryInterface.createTable('administrativo', Administrativo.atributos,{schema: schema});
    await queryInterface.createTable('medico', Medico.atributos,{schema: schema});
    await queryInterface.createTable('medico', Medico.atributos,{schema: schema});
    await queryInterface.createTable('calendartoken', CalendarToken.atributos,{schema: schema});
    await queryInterface.createTable('edificio', Edificio.atributos,{schema: schema});
    await queryInterface.createTable('ubicacion', Ubicacion.atributos,{schema: schema});
    await queryInterface.createTable('servicio', Servicio.atributos,{schema: schema});
    await queryInterface.createTable('tiposervicio', TipoServicio.atributos,{schema: schema});
    await queryInterface.createTable('especialidad', Especialidad.atributos,{schema: schema});
    await queryInterface.createTable('especialidadmedico', EspecialidadMedico.atributos,{schema: schema});
    await queryInterface.createTable('especialidadservicio', EspecialidadServicio.atributos,{schema: schema});
    await queryInterface.createTable('serviciolocal', ServicioLocal.atributos,{schema: schema});
    await queryInterface.sequelize.query(`ALTER TABLE ${schema}.serviciolocal DROP CONSTRAINT IF EXISTS uk_edificio_ubicacion;ALTER TABLE ${schema}.serviciolocal ADD CONSTRAINT "uk_edificio_ubicacion" UNIQUE ("idedificio", "idubicacion");`);
    await queryInterface.createTable('serviciodomicilio', ServicioDomicilio.atributos,{schema: schema});
    await queryInterface.createTable('guardia', Guardia.atributos,{schema: schema});
    await queryInterface.createTable('guardiamedicoasignacion', GuardiaMedico.atributos,{schema: schema});
    await queryInterface.createTable('guardiamedicopostulacion', GuardiaMedicoPostulacion.atributos,{schema: schema});
    await queryInterface.createTable('eventualidad', Eventualidad.atributos,{schema: schema});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
  }
};
