const { Router } = require("express");

const AnalyticsRequestSchema = require("./schema");
const { AnalyticsRequest } = require("./models");

const router = Router();

const signer = require("../helpers/signer.service");
const analyticsService = require("./service");
const secretsService = {
  reportingApiUrl: () => process.env.REPORTING_API_URL,
  key: () => process.env.KEY,
  publisherToken: () => process.env.PUBLISHER_TOKEN,
};

router.post("/", async (req, res) => {
  const { error } = AnalyticsRequestSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  const getAnalyticsRequest = AnalyticsRequest.fromJson(req.body);
  const signature = signer.createSignature(
    getAnalyticsRequest,
    secretsService.key()
  );
  const getAnalyticsResponse = await analyticsService.getAnalytics(
    getAnalyticsRequest,
    signature,
    secretsService.publisherToken(),
    secretsService.reportingApiUrl()
  );
  return res.json(getAnalyticsResponse);
});

module.exports = router;
