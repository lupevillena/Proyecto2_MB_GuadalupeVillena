const validated = (message) => {
  return (req, res, next) => {
    if (message) {
      return res.status(400).json({
        message: message
      });
    }

    next();
  };
};

module.exports = validated;