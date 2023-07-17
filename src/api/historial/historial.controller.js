import { PrismaClient } from '@prisma/client'
import { catchAsyncErrors } from '../../middleware/catchAsyncErrors'
import { ErrorHandler } from '../../utils/errorHandler'


const prisma = new PrismaClient

export const obtenerHistorial = catchAsyncErrors(async (req, res, next) => {
    const historial = await prisma.historial.findMany({
        include: {
            equipo: {
                include: {
                    cliente: true
                }
            },
        }
    })

    res.status(200).json({
        success: true,
        results: historial
    })
})


export const eliminarDelHistorial = catchAsyncErrors(async (req, res, next) => {
    const id = Number(req.params.id)
    if(!id)
        return next(new ErrorHandler('Falta el campo: id', 400))
    
    if(req.body?.workerKey !== process.env.WORKER_KEY)
        return next(new ErrorHandler('No tienes permiso suficiente', 400))

    await prisma.historial.delete({
        where: { id }
    })

    res.status(200).json({
        success: true,
        message: 'Eliminado con exito'
    })
})