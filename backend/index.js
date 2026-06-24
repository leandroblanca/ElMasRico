const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); 
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
// Rutas de la API
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/productos', require('./routes/productosRoutes')); 


// 2. Ejecutamos la prueba de fuego ACÁ EN EL MEDIO
db.query('SELECT 1 + 1 AS resultado')
    .then(([rows]) => {
        console.log('✅ ¡Conexión a MySQL exitosa! La base de datos responde.');
    })
    .catch(err => {
        console.error('❌ Error al conectar a MySQL:', err.message);
    });

const PORT = process.env.PORT || 5000;

// 3. El app.listen siempre, pero SIEMPRE, va al FINAL de todo el archivo
app.listen(PORT, () => {
    console.log(`🚀 Servidor de la sanguchería corriendo en el puerto ${PORT}`);
});