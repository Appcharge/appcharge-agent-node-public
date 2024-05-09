const { Router } = require("express");
const axios = require("axios");

const headers = {
  "x-publisher-token": process.env.PUBLISHER_TOKEN,
};

const router = Router();
const url = process.env.APPCHARGE_API_URL;

// This request is used to get a list of orders from the reporting service
// This is your internal service
router.post("/", async (req, res) => {
  const exampleReqBody = {
    // The start date of the query in UTC ISO 8601 time format
    startDate: new Date("2023-10-05").toISOString(),
    // The end date of the query in UTC ISO 8601 time format
    endDate: new Date().toISOString(),
    // The returned records limit to be used in pagination
    recordLimit: 100,
    // The bulk offset to be used in pagination
    offset: 0,
    // The required orders statuses: created, payment_pending, payment_succeed, payment_failed,
    // charge_pending, charge_succeed, charge_failed
    // Pass an empty list to retrieve reports for all statuses.
    statuses: ["payment_succeed"],
  };
  const path = url + "/reporting/reports/orders";
  const response = await axios.post(path, exampleReqBody, { headers });
  res.json(response.data);
});

module.exports = router;
