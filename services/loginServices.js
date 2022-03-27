const { randomBytes } = require('crypto');

const getToken = async () => randomBytes(8).toString('hex');

module.exports = { getToken };