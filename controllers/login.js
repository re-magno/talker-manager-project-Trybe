const login = require('../services/loginServices');

const getToken = (_req, res, next) => login.getToken()
.then((data) => res.status(200).json({ token: data }))
.catch((err) => next(err));

module.exports = { getToken };