const router = require("express").Router();
const {
  models: { Safespace, Message },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const safespaces = await Safespace.findAll({
      include: [Message],
    });
    res.json(safespaces);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const safespace = await Safespace.create(req.body);
    res.status(201).json(safespace);
  } catch (err) {
    next(err);
  }
});
