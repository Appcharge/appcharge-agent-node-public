// Load environment variables
const { checkEnvVariables } = require("./helpers/check-envs");
require("dotenv").config();
checkEnvVariables();

// Load required modules
const express = require("express");
const bodyParser = require("body-parser");
const authController = require("./controllers/auth/auth.controller");
const playerController = require("./controllers/player/player.controller");
const ordersController = require("./controllers/order/order.controller");
const analyticsController = require("./controllers/analytics/analytics.controller");
const offerController = require("./controllers/offer/offer.controller");
const authMiddleware = require("./middleware/auth.middleware");

const PORT = process.env.PORT || 8080;

// Create Express app instance
const app = express();

// Set up middlewares
app.use(bodyParser.text());
app.use(express.json());

// Middleware to handle errors
app.use((error, req, res, next) => {
  console.error("Error: ", error);
  res.status(400).send("Bad Request");
});

// Set up routes
app.use("/mocker/auth", authMiddleware, authController);
app.use("/mocker", authMiddleware, playerController);
app.use("/mocker/orders", authMiddleware, ordersController);
app.use("/mocker/analytics", authMiddleware, analyticsController);
app.use("/mocker/offers", authMiddleware, offerController);

// Start the server
app.listen(PORT, () => console.log(`Webhook server started on port ${PORT}!`));
