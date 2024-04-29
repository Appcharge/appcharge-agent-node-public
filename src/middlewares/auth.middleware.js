const { parseSignature } = require("../helpers");

module.exports = authMiddleware = (signService) => (req, res, next) => {
  console.log(req.headers);
  const expectedSignature = parseSignature(req.headers["signature"]);
  const payloadToSign = `${expectedSignature.t}.${JSON.stringify(req.body)}`;
  const sign = signService.signPayload(payloadToSign);
  if (sign !== expectedSignature.v1) {
    return res.status(401).json({ error: "Invalid authorization header" });
  }
  next();
};
