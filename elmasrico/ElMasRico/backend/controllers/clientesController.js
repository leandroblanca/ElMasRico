const db = requiere('../config/db')

async function crearCliente(req, res) {
    const {nombre, telefono, direccion} = req.body
    
    if (!nombre || !telefono) {
        return res.status(400).json({
            menssage: 'Nombre y telefono son obligatorio'
        })
    }
    try {
        const [result] = await db.query('INSERT INTO (nombre, telefono, direccion) VALUES (?,?,?)',
             [nombre, telefono,direccion || null])
             res.status(201).json({
                menssage: 'El usuario registrado con exito'
             })
    } catch (error) {
       return res.status(500).json({
        message: 'Error al registrar el usuario '
       })        
    }
}

async function obtenerCliente(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM clientes')
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los clientes'
        })
    }
}

async function actualizarClientes(req, res) {
    const {id} = req.params
    const {nombre, telefono, direccion} = req.body
    if(!nombre || !telefono){
        return res.status(400).json({
            message: 'Es obligatorio el nombre y telefono'
        })
    }
    try {
        const [result] = await db.query('UPDATE clientes SET nombre = ?, telefono = ?, direccion = ? WHERE id_cliente = ?', 
            [nombre, telefono, direccion, id]
        )
        if (result.affectedRows === 0) {
            res.status(400).json({
                message: 'Cliente no encontrado'
            })
        }
        return res.status(200).json({
            message: 'Datos del cliente actualizado'
        })        
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el cliente'
        })
    }
}


async function eliminarCliente(req, res) {
    const {id} = req.params
    try {
        const [result] = await db.query('DELETE FROM clientes WHERE id_cliente = ?', [id])
        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: 'Error al encontrar el cliente'
            })
        }
        return res.status(200).json({
            message: 'El cliente fue eliminado exitosamente'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el cliente'
        })
    }
}

module.export = {
    crearCliente,
    obtenerCliente,
    actualizarClientes,
    eliminarCliente    
}