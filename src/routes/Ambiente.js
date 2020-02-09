const express = require('express');
const Ambientes = require('./../controllers/Ambiente');
const ambiente_router = express.Router();
const { middleware } = require('./../utils/utils');

ambiente_router.get('/ambiente', Ambientes.getAmbienteWithPabellon);
ambiente_router.post('/ambiente', Ambientes.postAmbiente)
ambiente_router.put('/ambiente/:id_ambiente', middleware, Ambientes.putAmbiente)

module.exports = {
    ambiente_router
}