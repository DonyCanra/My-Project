const { verifyToken } = require("../helpers/jwt");
const { Player } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const decoded = verifyToken(access_token);
    const player = await Player.findOne({
      where: { id: decoded.id },
    });

    if (!player) throw { name: "InvalidToken" };

    req.player = player;

    next();
  } catch (err) {
    next(err);
  }
};


module.exports = authentication

