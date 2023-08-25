const router = require("express").Router();

const {
  models: { GYNDoctor },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const doctors = await GYNDoctor.findAll();
    res.json(doctors);
  } catch (error) {
    next(error);
  }
});
