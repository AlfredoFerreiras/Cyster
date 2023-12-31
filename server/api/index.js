const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/messages", require("./message"));
router.use("/safespaces", require("./safespaces"));
router.use("/GYNDoctor", require("./doctors"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
