const express = require("express");
const routes = require("./routes/roteador");
const cors = require("cors");

const server = express();

const corsOptions = {
  /* origin: process.env.ORIGIN_DOMAIN, */
  origin: ["http://localhost", "http://localhost:80"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Requested-With",
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middleware de CORS
server.use(cors(corsOptions));

server.use(express.json());
server.use("/api", routes);

// health check endpoint
server.get("/api", (req, res) => {
  res.send("Hello World");
});

// error handler
server.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
