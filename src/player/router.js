const { Router } = require("express");
const router = Router();

const exampleData = require("./example-data/offers-and-segments-dataset.json");

const { UpdateBalanceRequest } = require("./models");
const playerService = require("./player.service");
const signer = require("../helpers/signer.service");
const secretsService = {
  key: () => process.env.SIGN_KEY,
};

// Request will be made by Appcharge
// - When a player logs in.
// - When a player makes a purchase.
// - When 5 minutes have elapsed since the player's last synchronization.
// so the example data will be returned as a response
// In example folder you can find the example data with offers, with segments and with offers and segments together
router.get("/playerInfoSync", async (req, res) => {
  // In req.body will be sent:
  // - playerId: string
  //   | The playerId that was returned by the publisher in the player auth phase
  // - sessionMetadata: string | object
  //   | SessionMetadata that has been sent via auth or another playerDataSync request.
  //   | If it was not sent, this field will not be present in the request body. This property can be of any data type.
  return res.json(exampleData);
});

// This request will be made by Appcharge
// Reason: to update the player's balance
// Request will include sessionMetadata and playerId to identify the player
// After this one the playerInfoSync will be called to fetch new data
router.post("/playerUpdateBalance", async (req, res) => {
  const updateBalanceRequest = UpdateBalanceRequest.fromJson(req.body);
  const signature = signer.createSignature(
    updateBalanceRequest,
    secretsService.key()
  );
  const playerUpdateBalanceData = await playerService.updateBalance(
    signature,
    updateBalanceRequest
  );
  return res.json(playerUpdateBalanceData);
});

module.exports = router;
