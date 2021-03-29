import {Viaje} from '../models/Viajes.js';
import {Testimonial} from '../models/Testimoniales.js';
const  paginaInicio = async (req,res)=>{
    const promisesDB = []
    promisesDB.push(Viaje.findAll({limit:3}));
    promisesDB.push(Testimonial.findAll({limit:3}));
    try {
        // const viajes = await Viaje.findAll({limit:3});
        // const testimoniales = await Testimonial.findAll({limit:3})
        const resultado = await Promise.all(promisesDB);
        res.render('inicio',{
            pagina: 'inicio',
            clase:'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }
};

const paginaNosotros = (req,res)=>{
    res.render('nosotros',{
        pagina :'nosotros'
    });
};

const paginaViajes = async (req,res)=>{
    const viajes = await Viaje.findAll()
    res.render('viajes',{
        pagina:'Próximos Viajes',
        viajes
    });
};

const paginaTestimoniales = async (req,res)=>{
    try {
        const testimoniales = await Testimonial.findAll();//con esto consultamos todos los registros de la base de datos.
        res.render('testimoniales',{
            pagina :'testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
};

//muestra un viaje por su slug
const paginaDetalleViajes = async (req,res)=>{
    const {slug} = req.params;
    try {
        const resultado = await Viaje.findOne({where:{slug}})
        res.render('viaje',{
            pagina:'Información Viajes',
            resultado
        })
    } catch (error) {
        console.log(error)
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViajes,
}