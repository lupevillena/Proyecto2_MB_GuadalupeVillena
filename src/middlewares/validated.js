const validated = (req, res, next) => {
  if (req.validationError) {
    return res.status(400).json({
      message: req.validationError
    });
  }

  next();
};

module.exports = validated;