const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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
    console.log('Erro');
  }
});

app.get('/talker/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;

    const talkers = await fs.readFile('./talker.json');
    const talkersParse = JSON.parse(talkers);

    const talker = talkersParse.find((t) => t.id === Number(id));
    console.log(talkersParse);

    if (!talker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talker);
  } catch (e) {
    console.log('Erro');
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
