const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2,}$/;

  if (!email.match(regex)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const isValidToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length < 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ 
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ 
      message: 'O campo "age" é obrigatório',
    });
  }

  if (Number(age) < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  // const { watchedAt, rate } = talk;
  const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({ message });
  }

  next();
};

const isValidDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

  const r = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;

  if (watchedAt.length !== 10 || !watchedAt.match(r)) {
    return res.status(400).json({ message });
  }

  next();
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  const message = 'O campo "rate" deve ser um inteiro de 1 à 5';

  if (!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
};