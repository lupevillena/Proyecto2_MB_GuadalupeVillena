const express = require('express');
const postsService = require('../services/posts.service');
const validatePost = require('../middleware/validatePost');
const validated = require('../middleware/validated');

const router = express.Router();

// Obtener todos los posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Obtener posts de un autor
router.get('/author/:authorId', async (req, res, next) => {
  try {
    const authorId = req.params.authorId;

    const posts = await postsService.getPostsByAuthor(authorId);

    if (posts.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron posts para este autor'
      });
    }

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Obtener un post por ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await postsService.getPostById(id);

    if (!post) {
      return res.status(404).json({
        message: 'Post no encontrado'
      });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Crear un post
router.post(
  '/',
  validatePost,
  validated,
  async (req, res, next) => {
    try {
      const {
        title,
        content,
        author_id,
        published
      } = req.body || {};

      const post = await postsService.createPost(
        title,
        content,
        author_id,
        published
      );

      res.status(201).json(post);

    } catch (error) {
      // PostgreSQL: author_id no existe
      if (error.code === '23503') {
        return res.status(400).json({
          message: 'El autor indicado no existe'
        });
      }

      next(error);
    }
  }
);

// Actualizar un post
router.put(
  '/:id',
  validatePost,
  validated,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        title,
        content,
        author_id,
        published
      } = req.body || {};

      const post = await postsService.updatePost(
        id,
        title,
        content,
        author_id,
        published
      );

      if (!post) {
        return res.status(404).json({
          message: 'Post no encontrado'
        });
      }

      res.json(post);

    } catch (error) {
      // PostgreSQL: author_id no existe
      if (error.code === '23503') {
        return res.status(400).json({
          message: 'El autor indicado no existe'
        });
      }

      next(error);
    }
  }
);

// Eliminar un post
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await postsService.deletePost(id);

    if (!post) {
      return res.status(404).json({
        message: 'Post no encontrado'
      });
    }

    res.json({
      message: 'Post eliminado correctamente',
      post: post
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;