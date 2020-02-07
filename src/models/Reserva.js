// const { conexion } = require('./../config/Sequelize');
const Sequelize = require('sequelize');

const reserva_model = (conexion) => {
    let reserva = conexion.define(
        'reserva', {
        res_id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allownull: false
        },
        res_fechin: {
            type: Sequelize.DATE,
            allownull: false
        },
        res_fechfin: {
            type: Sequelize.DATE,
            allownull: false
        },
        res_obs:{
            // allownull: false,
            type: Sequelize.TEXT
        }
    }, {
        tableName: 't_reserva'
    });
    return reserva;
}
module.exports = reserva_model;