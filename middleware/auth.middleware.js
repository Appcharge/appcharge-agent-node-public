const parseSignature = require("../utils");

const signer = require("../signer.service").init(process.env.KEY);

function authMiddleware(req, res, next) {
  const expectedSignature = parseSignature(req.headers["signature"]);
  const payloadToSign = `${expectedSignature.t}.${JSON.stringify(req.body)}`;
  const sign = signer.signPayload(payloadToSign);
  if (sign !== expectedSignature.v1) {
    return res.status(401).json({ error: "Invalid authorization header" });
  }
  next();
}

module.exports = authMiddleware;
