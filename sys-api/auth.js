const crypto = require("crypto");
const { expressjwt } = require("express-jwt");

const { TOKEN_SECRET } = require("./env");

exports.encryptSHA256 = input => crypto.createHash("sha256").update(input).digest("hex");
exports.requireAuthMiddleware = expressjwt({ secret: TOKEN_SECRET, algorithms: ["HS256"] });
