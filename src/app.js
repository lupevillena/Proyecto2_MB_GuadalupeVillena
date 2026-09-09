const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const authorsRoutes = require('./routes/authors.routes');
const postsRoutes = require('./routes/posts.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const swaggerDocument = YAML.load('./openapi.yaml');

app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'API MiniBlog funcionando'
  });
});

// Rutas
app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

// Middleware global de errores
app.use(errorHandler);

module.exports = app;