const express = require('express');
const { isValidToken, talker } = require('../middlewares/validations');
const { getAll, getById, remove, create, update, search } = require('../controllers/talker');

const route = express.Router();

route.get('/', getAll);
route.post('/', isValidToken, talker, create);
route.get('/search', isValidToken, search);
route.get('/:id', getById);
route.delete('/:id', isValidToken, remove);
route.put('/:id', isValidToken, talker, update);

module.exports = route;