/* 
esta es la sintaxis vieja con la que se trabajaba anteriormente en Node.js
const express = require('express');

const app = express();

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`El servido  esta funcionando en el puerto ${port}`)

}) */

import express from 'express';
import router from './routes/index.js';//en esta nueva sintaxis se requiere poner la extension del archivo
import db from './config/db.js';
import dotenv from 'dotenv'; dotenv.config({path:'variables.env'});

const app = express();


/* aqui vamos a conectar con la base de datos. */
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//definimos el puerto
const puerto = process.env.PORT ||4000;
//habilitar pug para trabajar con las plantillas
app.set('view engine','pug')

//usaremos  nuestro propio middleware y obtendremos el año actual.
app.use( (req,res,next)=>{
    res.locals.unaVariable = new Date().getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes"
    next(); //la linea next nos ayuda a pasar a la siguiente instruccion del middleware
});//nota: use responde a todos los verbos, get,push,post,delete

//agregar bodyParser para leer los datos del formulario.
app.use(express.urlencoded({extended:true}));

//definir la carpeta publica
app.use(express.static('public')) //le declaramos a expres el nombre de la carpeta que contendra el css y las imagenes para nuestro proyecto

//Agregamos el router o las rutas deifinidas en routes/index.js
app.use('/',router);

/* puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(puerto,host,()=>{
    console.log(`El servidor esta listo y corriendo en el puerto ${puerto}`)
})