const { Router } = require("express");

const router = Router();

const offerService = require("./service").init(
  process.env.ASSET_UPLOAD_GATEWAY_URL
);

router.post("/", async (req, res) => {
  const createOfferResponse = await offerService.createOffer();
  return res.json(createOfferResponse);
});

router.put("/", async (req, res) => {
  const updateOfferResponse = await offerService.updateOffer();
  return res.json(updateOfferResponse);
});

module.exports = router;
