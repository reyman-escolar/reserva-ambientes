const express = require('express');
const Usuarios = require('./../controllers/Usuario');
const usuario_router = express.Router();

usuario_router.post('/registro', Usuarios.RegistrarUsuario);
usuario_router.post('/login', Usuarios.Login);

module.exports = {
    usuario_router
};