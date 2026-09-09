const pool = require('../db');

// Obtener todos los posts
const getAllPosts = async () => {
  const result = await pool.query(
    'SELECT * FROM posts ORDER BY id'
  );

  return result.rows;
};

// Obtener un post por ID
const getPostById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM posts WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

// Obtener posts de un autor con datos del autor
const getPostsByAuthor = async (authorId) => {
  const result = await pool.query(
    `SELECT
      posts.id,
      posts.title,
      posts.content,
      posts.published,
      posts.created_at,
      authors.id AS author_id,
      authors.name AS author_name,
      authors.email AS author_email
     FROM posts
     JOIN authors ON posts.author_id = authors.id
     WHERE authors.id = $1
     ORDER BY posts.id`,
    [authorId]
  );

  return result.rows;
};

// Crear un post
const createPost = async (title, content, authorId, published) => {
  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, authorId, published]
  );

  return result.rows[0];
};

// Actualizar un post
const updatePost = async (
  id,
  title,
  content,
  authorId,
  published
) => {
  const result = await pool.query(
    `UPDATE posts
     SET title = $1,
         content = $2,
         author_id = $3,
         published = $4
     WHERE id = $5
     RETURNING *`,
    [title, content, authorId, published, id]
  );

  return result.rows[0];
};

// Eliminar un post
const deletePost = async (id) => {
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};