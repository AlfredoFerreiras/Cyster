const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const { io } = require("./index");

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000"; // assuming 3000 as a default frontend port

module.exports = app;

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_ORIGIN, "https://cysters.onrender.com"], // allows both localhost and your production frontend
    credentials: true,
  })
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "http://localhost:8080",
        "https://cysters.onrender.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://media.istockphoto.com",
        "img.youtube.com",
        "yt3.ggpht.com",
      ],
      connectSrc: [
        "'self'",
        "http://localhost:8080",
        "ws://localhost:8080",
        "wss://cysters.onrender.com", // Secure WebSocket for your production domain
        "https://cysters.onrender.com", // Also, allow regular HTTP connections
      ],
    },
  })
);
// Use the static middleware here
app.use(express.static(path.join(__dirname, "../public")));

// Then your other routes
app.use("/auth", require("./auth")(io));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// Any remaining requests with an extension send a 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// The wildcard should be one of the last routes
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// Error handling should be the last middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
