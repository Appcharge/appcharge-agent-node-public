const express = require("express");

const { UpdateBalanceRequest } = require("./models");
const playerService = require("./service").init(
  process.env.AWARD_PUBLISHER_URL
);
const signer = require("../../signer.service").init(process.env.KEY);
const secretsService = {
  key: () => process.env.KEY,
};

const router = express.Router();

router.get("/playerInfoSync", async (req, res) => {
  const playerInfoSyncData = await playerService.infoSync();
  return res.json(playerInfoSyncData);
});

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
