require("dotenv").config();

const { checkEnvVariables } = require("./src/helpers/check-envs");
const startServer = require("./src/main");

// Load environment variables

// Check if required environment variables are defined
checkEnvVariables();

// Start express.js server
startServer().catch((error) => {
  console.error(error);
});
