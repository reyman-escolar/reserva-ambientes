const express = require('express');
const Reservas = require('./../controllers/Reserva');
const { middleware } = require('./../utils/utils');
const reserva_router = express.Router();


reserva_router.post('/reserva', middleware, Reservas.postReserva);
reserva_router.get('/reserva/:fechin/:fechfin/:ambId', Reservas.validarReserva);
reserva_router.get('/reserva/:fechin/:fechfin', Reservas.getReservaByFecha);


module.exports = {
    reserva_router
};