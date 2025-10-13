const express = require('express');
const app = express();
require('dotenv').config();
// const postRoutes = require('./routes/postRoutes')
const db = require('../db/models');

app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, async()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    await db.sequelize.sync();
})

console.log("UnaHur - Anti-Social net");
