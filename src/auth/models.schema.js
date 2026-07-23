const Joi = require("joi");

const AuthenticationRequestSchema = Joi.object({
  authMethod: Joi.string()
    .valid("facebook", "google", "apple", "userToken", "userPassword")
    .required(),
  token: Joi.string().required(),
  date: Joi.date().iso().required(),
  appId: Joi.string().required(),
  userName: [Joi.string().optional(), Joi.allow(null)],
  password: [Joi.string().optional(), Joi.allow(null)],
  publisherToken: [Joi.string().optional(), Joi.allow(null)],
  sessionId: [Joi.string().optional(), Joi.allow(null)],
});

module.exports = AuthenticationRequestSchema;
