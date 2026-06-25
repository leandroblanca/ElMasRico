const db = require('../config/db');

// A. CREAR UN PRODUCTO NUEVO (POST)
const crearProducto = async (req, res) => {
    const { name_produc, precio, id_categoria } = req.body;

    if (!name_produc || !precio || !id_categoria) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO PRODUCTOS (name_produc, precio, id_categoria) VALUES (?, ?, ?)',
            [name_produc, precio, id_categoria]
        );
        return res.status(201).json({
            message: '🍔 Producto agregado al menú con éxito',
            id_producto: result.insertId
        });
    } catch (error) {
        console.error(error);
        if (error.errno === 1062) {
            return res.status(400).json({ message: 'Ese producto ya existe en el menú ❌' });
        }
        return res.status(500).json({ message: 'Error en el servidor al crear el producto' });
    }
};

// B. OBTENER TODOS LOS PRODUCTOS (GET)
const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM PRODUCTOS');
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor al obtener los productos' });
    }
};

// C. ACTUALIZAR UN PRODUCTO (PUT) - Ideal para cambiar precios
const actualizarProducto = async (req, res) => {
    const { id } = req.params; // Sacamos el id de la URL (ej: /api/productos/1)
    const { name_produc, precio, id_categoria } = req.body;

    if (!name_produc || !precio || !id_categoria) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await db.query(
            'UPDATE PRODUCTOS SET name_produc = ?, precio = ?, id_categoria = ? WHERE id_producto = ?',
            [name_produc, precio, id_categoria, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado 🔎' });
        }

        return res.status(200).json({ message: '🔄 Producto actualizado con éxito' });
    } catch (error) {
        console.error(error);
        if (error.errno === 1062) {
            return res.status(400).json({ message: 'Ya existe otro producto con ese nombre ❌' });
        }
        return res.status(500).json({ message: 'Error en el servidor al actualizar el producto' });
    }
};

// D. BORRAR UN PRODUCTO (DELETE)
const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM PRODUCTOS WHERE id_producto = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado 🔎' });
        }

        return res.status(200).json({ message: '🗑 Producto eliminado del menú' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor al eliminar el producto' });
    }
};

// Exportamos las CUATRO funciones para las rutas
module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto
};