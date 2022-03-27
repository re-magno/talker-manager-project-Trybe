const express = require('express');
const bodyParser = require('body-parser');
const validators = require('./middlewares/validations');
const talkerServ = require('./services/talkerServices');
const { getToken } = require('./services/loginServices');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res, next) => {
  try {
    const talkers = await talkerServ.getAll();
    return res.status(200).json(talkers);
  } catch (err) {
    next(err);
  }
});

app.get('/talker/search', validators.isValidToken, async (req, res, next) => {
  try {
    const talkers = await talkerServ.search(req.body);
    return res.status(200).json(talkers);
  } catch (err) {
    next(err);
  }
});

app.get('/talker/:id', async (req, res, next) => {
  try {
    const talker = await talkerServ.getById(req.params);
    return res.status(200).json(talker);
  } catch (err) {
    next(err);
  }
});

app.post('/login', validators.login, (_req, res) => res.status(200).json({ token: getToken() }));

app.use(validators.isValidToken);

app.delete('/talker/:id', async (req, res, next) => {
  try {
    await talkerServ.remove(req.params);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.use(validators.talker);

app.post('/talker', async (req, res, next) => {
  try {
    const talker = await talkerServ.create(req.body);
    return res.status(201).json(talker);
  } catch (err) {
    next(err);
  }
});

app.put('/talker/:id', async (req, res, next) => {
  try {
    const editedTalker = await talkerServ.update(req.body, req.params);
    return res.status(200).json(editedTalker);
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  if (!err.code) return res.status(500).json({ message: err.message });
  return res.status(err.code).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log('Online');
});
