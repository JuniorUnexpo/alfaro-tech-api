import { Router } from 'express'
import { 
    eliminarDelInventario,
    obtenerInventario, 
    editarInventario,
    aniadirAlInventario
} from './inventario.controller'

export const inventarioRouter = Router()

inventarioRouter.route('/inventario/registrar').post(aniadirAlInventario)

inventarioRouter.route('/inventario/obtener').get(obtenerInventario)

inventarioRouter.route('/inventario/editar/:id/:workerKey').put(editarInventario)

inventarioRouter.route('/inventario/eliminar/:id/:workerKey').delete(eliminarDelInventario)