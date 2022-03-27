const express = require('express');
const { getToken } = require('../controllers/login');
const { login } = require('../middlewares/validations');

const route = express.Router();

route.post('/', login, getToken);

module.exports = route;