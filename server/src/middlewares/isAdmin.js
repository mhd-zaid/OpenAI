const User = require("../Models");

const isAdmin = async (req, res, next) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).send("No user");
  }
  if (user.role !== "admin") {
    return res.status(403).send("Not authorized");
  }
  next();
};

module.exports = isAdmin;


const User = require("../Models");

const isAdmin = async (req, res, next) => {
  const { userId } = req.user;
  const user = userId && await User.findOne({ where: { id: userId } });

  if (!userId) return res.status(401).send("Unauthorized");
  if (!user) return res.status(404).send("No user");
  if (user.role !== "admin") return res.status(403).send("Not authorized");

  next();
};

module.exports = isAdmin;