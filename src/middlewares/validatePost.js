const validatePost = (req, res, next) => {
  const {
    title,
    content,
    author_id
  } = req.body || {};

  if (!title || title.trim() === '') {
    req.validationError = 'El título es obligatorio';
    return next();
  }

  if (!content || content.trim() === '') {
    req.validationError = 'El contenido es obligatorio';
    return next();
  }

  if (!author_id) {
    req.validationError = 'El author_id es obligatorio';
    return next();
  }

  next();
};

module.exports = validatePost;