import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import { errorMiddleware } from './middleware/error'


/** Routes imports */
import { inventarioRouter } from './api/inventario/inventario.routes'
import { reparacionRouter } from './api/reparacion/reparacion.routes'
import { historialRouter } from './api/historial/historial.routes'


dotenv.config({ path: path.join(__dirname, 'config', '.env') })
export const app = express()

/** Global variables */
app.set('port', process.env.PORT || 5000)


/** Middlewares */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '60mb' }))
app.use(cookieParser(process.env.SECRET_SESSION_KEY))
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))
app.use(cors({
    origin: process.env.FRONTEND_HOST,
    credentials: true
}))
//app.use(sessionMiddleware())


/** Middlewares Routes */
app.use('/api/v1', inventarioRouter)
app.use('/api/v1', reparacionRouter)
app.use('/api/v1', historialRouter)


app.use(errorMiddleware)