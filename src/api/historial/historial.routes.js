import { Router } from 'express'
import { obtenerHistorial } from './historial.controller'

export const historialRouter = Router()


historialRouter.route('/historial/obtener').get(obtenerHistorial)