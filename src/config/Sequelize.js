const Sequelize = require('sequelize');
const pabellon_model = require('./../models/Pabellon');
const ambiente_model = require('./../models/Ambiente');
const reserva_model = require('./../models/Reserva');
const usuari_model = require('./../models/Usuario');

const conexion = new Sequelize('GxzD7hs6ET','GxzD7hs6ET','dg9R3kuGkg', {
    //'ambientes', 'root', 'Aa123', {
    // host: 'localhost',
    host: 'remotemysql.com',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    },
    timezone: '-05:00'
});
// Creando modelos
const Pabellon = pabellon_model(conexion);
const Ambiente = ambiente_model(conexion);
const Reserva = reserva_model(conexion);
const Usuario = usuari_model(conexion);
//  Creadno relaciones
Pabellon.hasMany(Ambiente, { foreignKey: 'pab_id' });
Ambiente.belongsTo(Pabellon, { foreignKey: 'pab_id' });

Ambiente.hasMany(Reserva, { foreignKey: 'amb_id' });
Reserva.belongsTo(Ambiente, { foreignKey: 'amb_id' });
// hasMany -> tiene  muchas
// belongTo -> pertenece a 
Usuario.hasMany(Reserva, { foreignKey: 'usu_autoriza' });
Reserva.belongsTo(Usuario, { foreignKey: 'usu_autoriza' });

Usuario.hasMany(Reserva, { foreignKey: 'usu_reserva' });
Reserva.belongsTo(Usuario, { foreignKey: 'usu_reserva' });

module.exports = {
    conexion: conexion,
    Pabellon: Pabellon,
    Ambiente: Ambiente,
    Reserva: Reserva,
    Usuario
}