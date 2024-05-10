const { Router } = require("express");

const router = Router();

const offerService = require("./service").init(
  process.env.APPCHARGE_API_URL,
  process.env.PUBLISHER_TOKEN
);

router.post("/", async (req, res) => {
  const createOfferResponse = await offerService.createOffer();
  return res.json(createOfferResponse);
});

router.put("/", async (req, res) => {
  const updateOfferResponse = await offerService.updateOffer();
  return res.json(updateOfferResponse);
});

router.delete("/", async (req, res) => {
  const deleteOfferResponse = await offerService.deleteOffer();
  return res.json(deleteOfferResponse);
});

module.exports = router;
