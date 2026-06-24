const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para Registrar (POST /api/usuarios/registrar)
router.post('/registrar', usuariosController.registrarUsuario);
// Ruta para Login (POST /api/usuarios/login)
router.post('/login', usuariosController.loginUsuario);

// Exportamos el router
module.exports = router;