exports.checkEnvVariables = () => {
  // Check if required environment variables are defined
  if (!process.env.SIGN_KEY) {
    throw new Error("Missing SIGN_KEY environment variable");
  }

  if (!process.env.FACEBOOK_APP_SECRET) {
    throw new Error("Missing FACEBOOK_APP_SECRET environment variable");
  }

  if (!process.env.APPLE_SECRET_API) {
    throw new Error("Missing APPLE_SECRET_API environment variable");
  }

  return;
};
