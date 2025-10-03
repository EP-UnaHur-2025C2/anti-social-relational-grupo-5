const express = require('express')
const app = express

// const db = require('')

app.use(express.json)

const PORT = 3000

app.listen(PORT, async()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    await db.sequelize.sync()
})

console.log("UnaHur - Anti-Social net");
