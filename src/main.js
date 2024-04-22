// Load required modules
const express = require("express");
const bodyParser = require("body-parser");
const { authMiddleware } = require("./middlewares");
const { SignatureHashingService } = require("./helpers");

const { router: authRouter } = require("./auth");
const { router: playerRouter } = require("./player");
const { router: orderRouter } = require("./order");
const { router: offerRouter } = require("./offer");
const { router: analyticRouter } = require("./analytics");

const PORT = process.env.PORT || 8080;

module.exports = async () => {
  const signService = new SignatureHashingService(process.env.SIGN_KEY);

  // Create Express app instance
  const app = express();

  // Set up middlewares
  app.use(bodyParser.text());
  app.use(express.json());
  app.use(authMiddleware(signService));

  // Middleware to handle errors
  app.use((error, req, res, next) => {
    console.error("Error: ", error);
    res.status(400).send("Bad Request");
  });

  // Set up routes
  app.use("/mocker/auth", authRouter);
  app.use("/mocker/player", playerRouter);
  app.use("/mocker/orders", orderRouter);
  app.use("/mocker/offers", offerRouter);
  app.use("/mocker/analytics", analyticRouter);

  // Start the server
  app.listen(PORT, () =>
    console.log(`Webhook server started on port ${PORT}!`)
  );
};
