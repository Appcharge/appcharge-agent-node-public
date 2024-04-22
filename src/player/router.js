const { Router } = require("express");
const router = Router();

module.exports = router;

const { UpdateBalanceRequest } = require("./models");
const playerService = require("./player.service").init(
  process.env.AWARD_PUBLISHER_URL
);
const signer = require("../helpers/signer.service").init(process.env.SIGN_KEY);
const secretsService = {
  key: () => process.env.SIGN_KEY,
};

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
