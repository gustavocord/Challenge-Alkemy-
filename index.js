const express = require('express');
const app = express();
require ("./database.js");
const router =require( './routes/api.js')
require('dotenv').config()


app.use(express.urlencoded({extended: true}))
app.use(express.json())

//rutas
app.use('/api/', router);



/* ----------- sever------------------ */
    
const PORT = process.env.PORT || process.env.LOCAL_PORT
const server = app.listen(PORT, () => {
    
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))

