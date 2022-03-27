const { randomBytes } = require('crypto');

const getToken = () => randomBytes(8).toString('hex');

module.exports = { getToken };