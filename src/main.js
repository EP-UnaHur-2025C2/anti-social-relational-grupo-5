const express = require('express');
const app = express();
require('dotenv').config();
// const postRoutes = require('./routes/postRoutes')
const db = require('../db/models');

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postimagenesRoutes = require('./routes/postimagenesRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/postsimg', postimagenesRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, async()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    await db.sequelize.sync();
})

console.log("UnaHur - Anti-Social net");
