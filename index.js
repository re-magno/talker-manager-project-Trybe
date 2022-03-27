const express = require('express');
const bodyParser = require('body-parser');
const validators = require('./middlewares/validations');
// const talkerServ = require('./services/talkerServices');
const { getToken } = require('./controllers/login');
const { getAll, getById, remove, create, update, search } = require('./controllers/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAll);

app.get('/talker/search', validators.isValidToken, search);

app.get('/talker/:id', getById);

app.post('/login', validators.login, getToken);

app.use(validators.isValidToken);

app.delete('/talker/:id', remove);

app.use(validators.talker);

app.post('/talker', create);

app.put('/talker/:id', update);

app.use((err, _req, res, _next) => {
  if (!err.code) return res.status(500).json({ message: err.message });
  return res.status(err.code).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log('Online');
});
