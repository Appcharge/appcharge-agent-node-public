const { Router } = require("express");
const GetOrdersRequestSchema = require("./schema");
const { GetOrdersRequest } = require("./models");

const router = Router();

module.exports = router;

const signer = require("../helpers/signer.service").init(process.env.KEY);
const orderService = require("./service").init(process.env.REPORTING_API_URL);

const secretsService = {
  reportingApiUrl: () => process.env.REPORTING_API_URL,
  key: () => process.env.KEY,
  publisherToken: () => process.env.PUBLISHER_TOKEN,
};

router.post("/", async (req, res) => {
  const { error } = GetOrdersRequestSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  const getOrdersRequest = GetOrdersRequest.fromJson(req.body);
  const signature = signer.createSignature(
    getOrdersRequest,
    secretsService.key()
  );
  const getOrdersResponse = await orderService.getOrders(
    getOrdersRequest,
    signature,
    secretsService.publisherToken(),
    secretsService.reportingApiUrl()
  );
  return res.json(getOrdersResponse);
});
