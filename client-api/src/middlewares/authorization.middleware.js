const { verifyAccessJWT } = require('../helpers/jwt.helper');
const { getJWT, deleteJWT } = require('../helpers/redis.helper');

const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  const decoded = await verifyAccessJWT(authorization);

  if (!decoded.email) {
    deleteJWT(authorization);
    return res.status(403).json({ message: 'Forbidden' });
  }

  // we pass this JWT and it returns id (uses the redis server)
  const userId = await getJWT(authorization);
  if (!userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  req.userId = userId;

  return next();
};

module.exports = {
  userAuthorization,
};
