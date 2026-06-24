const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
    const { name_usuario, id_role, contrasenia } = req.body;

    // Validación básica en el backend 
    if (!name_usuario || !id_role || !contrasenia) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // 1. Encriptación de contraseña (Acá usamos 'contrasenia' SIN LA R)
        const salt = await bcrypt.genSalt(10);
        const contraseniaEncriptada = await bcrypt.hash(contrasenia, salt);

        // 2. Insertamos el usuario en la base de datos
        const [result] = await db.query(
            'INSERT INTO usuarios (name_usuario, id_role, contrasenia) VALUES (?, ?, ?)',
            [name_usuario, id_role, contraseniaEncriptada]
        );

        // 3. Respondemos al frontend que todo salió de diez
        return res.status(201).json({
            message: '🐱‍🏍 Usuario registrado con éxito',
            id_usuario: result.insertId
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'ERROR en el servidor al registrar usuarios 🤦' });
    }
};

// 2. NUEVA FUNCIÓN: LOGIN DE USUARIO
const loginUsuario = async (req, res) => {
    const { name_usuario, contrasenia } = req.body;

    // Validación básica
    if (!name_usuario || !contrasenia) {
        return res.status(400).json({ message: 'Por favor, ingresá usuario y contraseña' });
    }

    try {
        // A. Buscamos el usuario en la base de datos
        const [rows] = await db.query('SELECT * FROM usuarios WHERE name_usuario = ?', [name_usuario]);
        
        // Si no encuentra ninguna fila, es porque el usuario no existe
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos ❌' });
        }

        const usuario = rows[0];

        // B. Comparamos la contraseña ingresada con la encriptada en la BD
        const contraseniaCorrecta = await bcrypt.compare(contrasenia, usuario.contrasenia);
        
        if (!contraseniaCorrecta) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos ❌' });
        }

        // C. Si todo está bien, creamos el Token JWT
        // Guardamos adentro del token el ID del usuario y su Rol para usarlo después
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, id_role: usuario.id_role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } // El token vence en 2 horas
        );

        // D. Respondemos con éxito mandando el token al frontend
        return res.status(200).json({
            message: '👋 ¡Bienvenido de nuevo!',
            token: token,
            usuario: {
                id_usuario: usuario.id_usuario,
                name_usuario: usuario.name_usuario,
                id_role: usuario.id_role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'ERROR en el servidor al iniciar sesión 🤦' });
    }
};

// Exportamos las DOS funciones para que las usen las rutas
module.exports = {
    registrarUsuario,
    loginUsuario
};
