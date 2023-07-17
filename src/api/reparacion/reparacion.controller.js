import { PrismaClient } from '@prisma/client'
import { catchAsyncErrors } from '../../middleware/catchAsyncErrors'
import { ErrorHandler } from '../../utils/errorHandler'


const prisma = new PrismaClient()

export const registroReparacion = catchAsyncErrors(async (req, res, next) => {
    if(req.body?.workerKey !== process.env.WORKER_KEY)
        return next(new ErrorHandler('No tienes permiso suficiente', 400))

    const datosCliente = {
        nombre: req.body.cliente.nombre,
        apellido: req.body.cliente.apellido,
        cedula: req.body.cliente.cedula,
        telefono: req.body.cliente.telefono,
        correo: req.body.cliente.correo,
        es_frecuente: req.body.cliente.esFrecuente
    }

    for(let key in datosCliente){
        if(!datosCliente[key] === undefined)
            return next(new ErrorHandler('Falta uno o varios datos del cliente', 400))
    }

    const datosEquipo = {
        nombre: req.body.equipo.nombre,
        marca: req.body.equipo.marca,
        modelo: req.body.equipo.modelo,
        problema: req.body.equipo.problema
    }

    const cliente = await prisma.cliente.findFirst({
        where: { cedula: datosCliente.cedula }
    })


    if(!cliente){
        await prisma.cliente.create({
            data: {
                ...datosCliente,
                equipos: {
                    create: {
                        ...datosEquipo,
                        historial: {
                            create: {
                                fecha: new Date(Date.now())
                            }
                        }
                    }
                }
            }  
        })
    } else {
        await prisma.equipo.create({
            data: {
                ...datosEquipo,
                cliente: {
                    connect: {
                        id: cliente.id
                    }
                },
                historial: {
                    create: {
                        fecha: new Date(Date.now())
                    }
                }
            }
        })
    }

    res.status(200).json({
        success: true,
        message: 'Equipo registrado con exito'
    })
})