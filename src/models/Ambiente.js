// const { conexion } = require('./../config/Sequelize');
const Sequelize = require('sequelize');

const ambiente_model = (conexion) => {
    let ambiente = conexion.define(
        'ambiente', {
        amb_id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allownull: false
        },
        amb_nro: {
            type: Sequelize.INTEGER,
            // unique: true,
            allownull: false
        },
        amd_foro: {
            type: Sequelize.INTEGER,
            allownull: false
        },
        amd_tipo: {
            type: Sequelize.STRING(10)
        }

    }, {
        tableName: 't_ambiente'
    });
    return ambiente;
}

module.exports = ambiente_model;