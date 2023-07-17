import { catchAsyncErrors } from "../../middleware/catchAsyncErrors"
import { PrismaClient } from "@prisma/client"
import { ErrorHandler } from "../../utils/errorHandler"


const prisma = new PrismaClient()


export const aniadirAlInventario = catchAsyncErrors(async (req, res, next) => {
    if(req.body?.workerKey !== process.env.WORKER_KEY)
        return next(new ErrorHandler('No tienes permiso suficiente', 400))

    const nombre = req.body.nombre
    const marca = req.body.marca
    const modelo = req.body.modelo
    const cantidad = req.body.cantidad
    const precio = req.body.precio

    if(!nombre || !marca || !modelo || !cantidad || !precio)
        return next(new ErrorHandler('Falta uno o varios campos', 400))
    
    await prisma.inventario.create({
        data: {
            nombre,
            marca,
            modelo,
            cantidad,
            precio
        }
    })

    res.status(200).json({
        success: true,
        message: 'Producto añadido exitosamente'
    })
})

export const obtenerInventario = catchAsyncErrors(async (req, res, next) => {

    const datosInventario = await prisma.inventario.findMany({})

    res.status(200).json({
        success: true,
        results: datosInventario
    })
})

export const editarInventario = catchAsyncErrors(async (req, res, next) => {
    const id = Number(req.params.id)
    if(!id)
        return next(new ErrorHandler('Falta el campo: id', 400))

    if(req.params?.workerKey !== process.env.WORKER_KEY)
        return next(new ErrorHandler('No tienes permiso suficiente', 400))
    
    const obj = {}

    if(req.body.nombre) obj.nombre = req.body.nombre
    if(req.body.marca) obj.marca = req.body.marca
    if(req.body.modelo) obj.modelo = req.body.modelo
    if(req.body.cantidad) obj.cantidad = req.body.cantidad
    if(req.body.precio) obj.precio = req.body.precio

    await prisma.inventario.update({
        where: { id },
        data: obj
    })

    res.status(200).json({
        success: true,
        message: 'Los cambios se han registrado con exito'
    })
})

export const eliminarDelInventario = catchAsyncErrors(async (req, res, next) => {
    const id = Number(req.params.id)
    if(!id)
        return next(new ErrorHandler('Falta el campo: id', 400))

    if(req.params?.workerKey !== process.env.WORKER_KEY)
        return next(new ErrorHandler('No tienes el permiso suficiente', 400)) 

    await prisma.inventario.delete({
        where: { id }
    })

    res.status(200).json({
        success: true,
        message: 'Producto eliminado con exito'
    })
})