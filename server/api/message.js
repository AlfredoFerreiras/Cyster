const router = require("express").Router();
const {
  models: { Message, User, Safespace },
} = require("../db");
module.exports = router;
router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      include: [User, Safespace],
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    const message = await Message.create({
      content: req.body.content,
      userId: user.id,
    });
    const messageId = await Message.findByPk(message.id, {
      include: [User],
    });
    res.status(201).json(messageId);
  } catch (err) {
    next(err);
  }
});
