const middleware = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    return res.status(401).json({ message: 'error' });
  }
};

module.exports = middleware;
