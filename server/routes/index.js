import express from 'express'
import {paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViajes} from '../controlers/paginasController.js'
import {guardarTestimonial} from '../controlers/testimonialController.js'

const router = express.Router(); //definimos el router que manejara las diferentes rutas

router.get('/',paginaInicio);

router.get('/nosotros',paginaNosotros);

router.get('/viajes',paginaViajes);

router.get('/viajes/:slug',paginaDetalleViajes);

router.get('/testimoniales',paginaTestimoniales);

router.post('/testimoniales',guardarTestimonial)

export default router;