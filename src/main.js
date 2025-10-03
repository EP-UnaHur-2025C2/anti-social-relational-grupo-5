const express = require('express')
const app = express
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
// const db = require('')

app.use(express.json)
userRoutes.use('/users', userRoutes)
postRoutes.use('/post', userRoutes)

const PORT = 3000

app.listen(PORT, async()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    await db.sequelize.sync()
})

console.log("UnaHur - Anti-Social net");
