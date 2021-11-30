const PostgresQueryGenerator = require('sequelize/lib/dialects/postgres/query-generator')

// En el dialecto postgres por defecto de sequelize ocurria un error en la sincronizacion de los modelos con la base de datos al tener el modelo un enumerado.
// Para solucionar el problema se implemento la siguiente funcion que remplaza la funcion por defecto de sequelize

PostgresQueryGenerator.prototype.pgEnum = function(tableName, attr, dataType, options) {
  const enumName = this.pgEnumName(tableName, attr, options);
  let values;
  if (dataType.values) {
    values = `ENUM(${dataType.values.map(value => this.escape(value)).join(', ')})`;
  } else {
    values = dataType.toString().match(/^ENUM\(.+\)/)[0];
  }
  var tabla;
  var schema;
  if(tableName.schema){
    tabla=tableName.tableName
    schema = tableName.schema;
  }
  else{
    tabla=tableName
    schema = options.schema;
  }
  let sql = `DO $$ BEGIN IF NOT EXISTS (select 1 from pg_type t  join pg_enum e on t.oid = e.enumtypid  join pg_catalog.pg_namespace n ON n.oid = t.typnamespace   where n.nspname= '${schema}' and t.typname = 'enum_${ tabla }_${ attr }' group by (n.nspname,t.typname)) THEN CREATE TYPE ${ enumName } AS ${ values }; END IF; END$$;`;
  if (!!options && options.force === true) {
    sql = this.pgEnumDrop(tableName, attr) + sql;
  }
  return sql;
}