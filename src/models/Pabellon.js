// const { conexion } = require('./../config/Sequelize')
const Sequelize = require('sequelize');

const pabellon_model = (conexion) => {
    let pabellon = conexion.define('pabellon', {
        pab_id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allownull: false
        },
        pab_nom: {
            type: Sequelize.STRING(50),
            allownull: false
        }
    }, {
        tableName: 't_pabellon',
        // Esto por si quieres eliminar los campos
        // timestamps: false
    });
    return pabellon;
}

module.exports = pabellon_model;