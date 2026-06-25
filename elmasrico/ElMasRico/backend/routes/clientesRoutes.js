const express = requiere('express')
const router = express.Router()
const clientesController = requiere('../controllers/clientesController')

router.post('/',clientesController, crearCliente)
router.get('/',clientesController, obtenerCliente)
router.post('/:id',clientesController, actualizarClientes)
router.post('/:id',clientesController, eliminarCliente)

module.export = router;