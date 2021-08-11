const express = require('express')
const bodyparser = require ('body-parser')
require ('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')

// Inicializar express
const app = express()

// Capturar el body
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// Conexion BD
 connectDB()

// habilitar Cors
app.use(cors())


// Routes
app.use('/api/user', require('./routes/user'))
app.use('/api/product', require('./routes/product'))
app.use('/api/category', require('./routes/category'))

// Iniciar servidor express
const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
    console.log(`Server Port ${PORT}`);
    console.log(`Server URL http://localhost:${PORT}`);
})