const express = require('express');
const { errorHandler } = require('./middlewares/errorHandler');
const loginRoute = require('./routes/login');
const talkerRoute = require('./routes/talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginRoute);
app.use('/talker', talkerRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Online');
});
