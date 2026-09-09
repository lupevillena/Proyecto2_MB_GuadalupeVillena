const validateAuthor = (req, res, next) => {
  const { name, email } = req.body || {};

  if (!name || name.trim() === '') {
    return res.status(400).json({
      message: 'El nombre es obligatorio'
    });
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({
      message: 'El email es obligatorio'
    });
  }

  next();
};

module.exports = validateAuthor;