import { Router } from 'express'
import { registroReparacion } from './reparacion.controller'

export const reparacionRouter = Router()

reparacionRouter.route('/reparacion/registro').post(registroReparacion)