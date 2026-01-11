const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      message: 'JWT diperlukan untuk registrasi'
    });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'guest') {
      return res.status(403).json({
        message: 'Token bukan guest token'
      });
    }

    next();
  } catch (err) {
    return res.status(403).json({
      message: 'JWT tidak valid atau kadaluarsa'
    });
  }
};
