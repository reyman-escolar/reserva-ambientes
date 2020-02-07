const express = require('express');
const bodyParser = require('body-parser');
const { conexion } = require('./../config/Sequelize');
const { pabellon_router } = require('./../routes/Pabellon');
const { ambiente_router } = require('./../routes/Ambiente');
const { reserva_router } = require('./../routes/Reserva');
const { usuario_router } = require('./../routes/Usuario');

// const Pabellon = require('./../models/Pabellon')

class Server {
    constructor() {
        this.app = express();
        this.puerto = 5000;
        this.habilitarCORS();
        this.configurarBodyParser();
        this.cargarRutas();
    }
    habilitarCORS() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

    }
    configurarBodyParser() {
        this.app.use(bodyParser.json());
    }
    cargarRutas() {
        // Asignando todas las rutas de pabellon_router al servidor
        this.app.use('/', pabellon_router, ambiente_router, reserva_router, usuario_router);
    }

    start() {
        this.app.listen(this.puerto, () => {
            console.log(`Tudo bem con el servidorsinho en el puerto ${this.puerto}`);
            conexion.sync({ force: false });
        });
    }
}

// export default Server;
module.exports = Server;