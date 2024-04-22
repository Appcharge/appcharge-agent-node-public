const axios = require("axios");
const fs = require("fs");
const path = require("path");

class PlayerService {
  constructor(apiUrl) {
    // Example file
    this.playerDataSetPath = path.resolve("./player-dataset.json");
    this.awardPublisherUrl = apiUrl;
  }

  async getInfoSyncData() {
    const playerInfoDataset = JSON.parse(
      fs.readFileSync(this.playerDataSetPath, { encoding: "utf-8" })
    );
    return playerInfoDataset;
  }

  async updateBalance(signature, requestBody) {
    const response = await axios.post(this.awardPublisherUrl, requestBody, {
      headers: {
        signature: signature,
        "x-publisher-token": process.env.PUBLISHER_TOKEN,
      },
    });
    return response.data;
  }

  static init(apiUrl) {
    return new PlayerService(apiUrl);
  }
}

module.exports = PlayerService;
