const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { randomBytes } = require('crypto');
const talkersUtils = require('./utils/fs-utils');
const {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
} = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res, _next) => {
  try {
    const file = await fs.readFile('./talker.json');
    const fileParse = JSON.parse(file);

    if (fileParse === 0) return res.status(200).json([]);

    return res.status(200).json(fileParse);
  } catch (e) {
    console.log(e);
  }
});

app.get('/talker/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;

    const talkers = await fs.readFile('./talker.json');
    const talkersParse = JSON.parse(talkers);

    const talker = talkersParse.find((t) => t.id === Number(id));

    if (!talker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talker);
  } catch (e) {
    console.log(e);
  }
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  const token = randomBytes(8).toString('hex');

  return res.status(200).json({ token });
});

app.use(isValidToken);

app.delete('/talker/:id', async (req, res) => {
const { id } = req.params;
try {
  const talkers = await talkersUtils.getTakers();

  const newTalkers = talkers.filter((talker) => talker.id !== +id);

  await talkersUtils.setTalkers(newTalkers);

  return res.status(204).end();
} catch (e) {
  console.log(e);
}
});

app.use(
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
);

app.post('/talker', async (req, res) => {
  try {
    const talkers = await talkersUtils.getTakers();

    const lastUsedId = talkers[talkers.length - 1].id;
    const id = lastUsedId + 1;

    const talker = { id, ...req.body };

    talkers.push(talker);

    await talkersUtils.setTalkers(talkers);

    return res.status(201).json(talker);
  } catch (e) {
    console.log(e);
  }
});

app.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const talkers = await talkersUtils.getTakers();
    const talkerIndex = talkers.findIndex((t) => t.id === +id);

    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
    console.log(talkers);
    await talkersUtils.setTalkers(talkers);

    const editedTalker = await talkersUtils.getTakerById(id);

    return res.status(200).json(editedTalker);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
