const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para crear un producto (POST)
router.post('/', productosController.crearProducto);

// Ruta para listar los productos (GET)
router.get('/', productosController.obtenerProductos);

// Ruta para actualizar un producto pasando su ID en la URL (PUT /api/productos/1)
router.put('/:id', productosController.actualizarProducto);

// Ruta para eliminar un producto pasando su ID en la URL (DELETE /api/productos/1)
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;