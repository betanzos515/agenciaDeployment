import {Testimonial} from '../models/Testimoniales.js'

const guardarTestimonial = async (req,res)=>{

    //validar el formulario
    const {nombre,correo,mensaje} = req.body;
    const errores = [];

    if(nombre.trim() === '')
        errores.push('El nombre está vacio')
    if(correo.trim() === '')
        errores.push('El email está vacio')
    if(mensaje.trim() === '')
        errores.push('El mensaje está vacio')

    if(errores.length > 0){
        res.render('testimoniales',{
            pagina:'testimoniales',
            errores,
            nombre,
            correo,
            mensaje
        })
    }else{
        //almacenarlo en la base de datos
        try{
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('testimoniales');
        }catch(error){
            console.log(error)
        }
    }
 }
 
export {
    guardarTestimonial
} 
    