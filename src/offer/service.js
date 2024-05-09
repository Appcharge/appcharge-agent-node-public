const axios = require("axios");
const fs = require("fs");
const path = require("path");

function getDataFromFile(path) {
  const dataString = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  return JSON.parse(dataString);
}

class OfferService {
  constructor(apiUrl) {
    this.offerUrl = `${apiUrl}/offering/offer/`;
    this.offersFilePath = path.resolve("./offer-bundle.example.json");
    this.signatureService = require("../helpers/signer.service").init(
      process.env.KEY
    );
  }

  async createOffer() {
    try {
      const offerDataset = getDataFromFile(this.offersFilePath);
      const createDataset = offerDataset["create"];
      const response = await axios.post(this.offerUrl, createDataset);
      const responseBody = response.data;

      await this.updateOfferIdInFile();

      return responseBody;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        console.error(error);
        return { error: "Internal Server Error" };
      }
    }
  }

  async updateOffer() {
    try {
      const offerDataset = getDataFromFile(this.offersFilePath);
      const updateOfferDataset = offerDataset["update"];
      const offerId = updateOfferDataset["publisherOfferId"];

      const modifiedOfferDataset = this.removeFields(updateOfferDataset, [
        "publisherOfferId",
        "createdBy",
        "intervals",
      ]);
      const path = this.offerUrl + offerId;

      const response = await axios.put(path, modifiedOfferDataset);
      const responseBody = response.data;

      return { body: responseBody, status: response.status };
    } catch (error) {
      console.error(error);
      return { error: "Internal Server Error" };
    }
  }

  removeFields(jsonNode, fieldNames) {
    const modifiedJsonNode = { ...jsonNode };
    fieldNames.forEach((fieldName) => delete modifiedJsonNode[fieldName]);
    return modifiedJsonNode;
  }

  async updateOfferIdInFile() {
    const offerDataset = getDataFromFile(this.offersFilePath);
    const dataToUse = offerDataset["create"];
    dataToUse["publisherOfferId"] = dataToUse["publisherOfferId"] + "1";
    fs.writeFileSync(
      this.offersFilePath,
      JSON.stringify(offerDataset, null, 2)
    );
  }

  static init(apiUrl, publisherToken) {
    return new OfferService(apiUrl, publisherToken);
  }
}

module.exports = OfferService;
