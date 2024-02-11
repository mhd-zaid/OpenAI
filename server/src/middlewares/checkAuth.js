const { verifyToken } = require("../../../../../5iw/Intégration AI/OpenAI/server/Services/token");

export default function () {
  return function (req, res, next) {
    const token = req.signedCookies['jwt']
    if (!token) return res.sendStatus(401);
    const proxyUser = verifyToken(token);
    req.user = proxyUser;
    next();
  };
};
