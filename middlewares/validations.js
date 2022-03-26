const errMessage = {
  emailRequired: 'O campo "email" é obrigatório',
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',
  passwordRequired: 'O campo "password" é obrigatório',
  invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',
  tokenNotFound: 'Token não encontrado',
  invalidToken: 'Token inválido',
  nameRequired: 'O campo "name" é obrigatório',
  invalidName: 'O "name" deve ter pelo menos 3 caracteres',
  ageRequired: 'O campo "age" é obrigatório',
  invalidAge: 'A pessoa palestrante deve ser maior de idade',
  talkRequired: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  invalidDate: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  invalidRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const err = (code, message) => ({ code, message });

const isValidEmail = (req, _res, next) => {
  const { email } = req.body;
  if (!email) return next(err(400, errMessage.emailRequired));
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2,}$/;
  if (!email.match(regex)) return next(err(400, errMessage.invalidEmail));
  next();
};

const isValidPassword = (req, _res, next) => {
  const { password } = req.body;
  if (!password) return next(err(400, errMessage.passwordRequired));
  if (password.length < 6) return next(err(400, errMessage.invalidPassword));
  next();
};

const isValidToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(err(401, errMessage.tokenNotFound));
  if (authorization.length < 16) return next(err(401, errMessage.invalidToken));
  next();
};

const isValidName = (req, _res, next) => {
  const { name } = req.body;
  if (!name) return next(err(400, errMessage.nameRequired));
  if (name.length < 3) return next(err(400, errMessage.invalidName));
  next();
};

const isValidAge = (req, _res, next) => {
  const { age } = req.body;
  if (!age) return next(err(400, errMessage.ageRequired));
  if (Number(age) < 18) return next(err(400, errMessage.invalidAge));
  next();
};

const isValidTalk = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return next(err(400, errMessage.talkRequired));
  }
  next();
};

const isValidDate = (req, _res, next) => {
  const { talk: { watchedAt } } = req.body;
  const r = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  if (watchedAt.length !== 10 || !watchedAt.match(r)) {
    return next(err(400, errMessage.invalidDate));
  }
  next();
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5) {
    return next(err(400, errMessage.invalidRate));
  }
  next();
};

const login = [isValidEmail, isValidPassword];
const talker = [
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
];

module.exports = { isValidToken, login, talker };