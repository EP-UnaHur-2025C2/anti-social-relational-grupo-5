const express = require('express');
const app = express();
require('dotenv').config();
// const postRoutes = require('./routes/postRoutes')
const db = require('../db/models');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors')

app.use(express.json());
app.use(cors());

const swaggerDocument = YAML.load('./swagger.yaml')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postimagenesRoutes = require('./routes/postimagenesRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/postsimagenes', postimagenesRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, async()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    console.log(`La documentacion se puede ver en localhost:${PORT}/api-docs`)
    await db.sequelize.sync();
})

console.log("UnaHur - Anti-Social net");
