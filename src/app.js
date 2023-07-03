import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import { errorMiddleware } from './middleware/error'
import { sessionMiddleware } from './middleware/session'
import { ErrorHandler } from './utils/errorHandler'

/** Routes imports */


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
app.use('/', (req, res, next) => {


    return next(new ErrorHandler('No encontrado', 404))

    res.status(200).json({
        success: true,
        message: "Está funcionando"
    })
})


app.use(errorMiddleware)