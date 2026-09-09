const express = require('express');
const authorsService = require('../services/authors.service');
const validateAuthor = require('../middlewares/validateAuthor');
const validated = require('../middlewares/validated');

const router = express.Router();

// Obtener todos los autores
router.get('/', async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();

    res.json(authors);
  } catch (error) {
    next(error);
  }
});

// Obtener un autor por ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const author = await authorsService.getAuthorById(id);

    if (!author) {
      return res.status(404).json({
        message: 'Autor no encontrado'
      });
    }

    res.json(author);
  } catch (error) {
    next(error);
  }
});

// Crear un autor
router.post(
  '/',
  validateAuthor,
  validated,
  async (req, res, next) => {
    try {
      const { name, email, bio } = req.body || {};

      const author = await authorsService.createAuthor(
        name,
        email,
        bio
      );

      res.status(201).json(author);

    } catch (error) {
      // PostgreSQL: email duplicado
      if (error.code === '23505') {
        return res.status(400).json({
          message: 'El email ya está registrado'
        });
      }

      next(error);
    }
  }
);

// Actualizar un autor
router.put(
  '/:id',
  validateAuthor,
  validated,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, email, bio } = req.body || {};

      const author = await authorsService.updateAuthor(
        id,
        name,
        email,
        bio
      );

      if (!author) {
        return res.status(404).json({
          message: 'Autor no encontrado'
        });
      }

      res.json(author);

    } catch (error) {
      // PostgreSQL: email duplicado
      if (error.code === '23505') {
        return res.status(400).json({
          message: 'El email ya está registrado'
        });
      }

      next(error);
    }
  }
);

// Eliminar un autor
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const author = await authorsService.deleteAuthor(id);

    if (!author) {
      return res.status(404).json({
        message: 'Autor no encontrado'
      });
    }

    res.json({
      message: 'Autor eliminado correctamente',
      author: author
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;