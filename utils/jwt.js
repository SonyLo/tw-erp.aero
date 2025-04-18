// utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config()
const crypto = require('crypto');

module.exports.generateAccessToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
module.exports.generateRefreshToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
module.exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
module.exports.decodeToken = (token) => jwt.decode(token);

// module.exports = { generateAccessToken, generateRefreshToken, verifyToken, decodeToken };