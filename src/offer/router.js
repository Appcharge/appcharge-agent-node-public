const { Router } = require("express");

const router = Router();

const offerService = require("./service");

// All the below requires will be send to Appcharge

// Create a new offer
// Documentation is here https://developers.appcharge.com/reference/create-offer
router.post("/", async (req, res) => {
  const createOfferResponse = await offerService.createOffer();
  return res.json(createOfferResponse);
});

// Update an existing offer
// Documentation is here https://developers.appcharge.com/reference/update-offer-by-id
router.put("/", async (req, res) => {
  const updateOfferResponse = await offerService.updateOffer();
  return res.json(updateOfferResponse);
});

// Delete an existing offer
// Documentation is here https://developers.appcharge.com/reference/delete-offer
router.delete("/", async (req, res) => {
  const deleteOfferResponse = await offerService.deleteOffer();
  return res.json(deleteOfferResponse);
});

// Get all offers
// Documentation is here https://api.appcharge.com/offering/offer/get-offers
router.get("/", async (req, res) => {
  const offers = await offerService.getOffers();
  return res.json(offers);
});

module.exports = router;
