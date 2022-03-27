const data = require('../utils/fs-utils');

const errMessage = {
  talkerNotfound: 'Pessoa palestrante não encontrada',
};
const err = (code, message) => ({ code, message });

const getAll = async () => {
  const talkers = await data.read();
  if (talkers === 0) return '[]';
  return talkers;
};

const getById = async ({ id }) => {
  const talkers = await getAll();
  const talker = talkers.find((t) => t.id === Number(id));
  if (!talker) throw err(404, errMessage.talkerNotfound);
  return talker;
};

const create = async (body) => {
  const talkers = await getAll();
  const talker = { id: talkers.length + 1, ...body };
  await data.write([...talkers, talker]);
  return talker;
};

const update = async ({ name, age, talk }, { id }) => {
  const talkers = await getAll();
  const talkerIndex = talkers.findIndex((t) => t.id === +id);
  const updatedTalker = { ...talkers[talkerIndex], name, age, talk };
  talkers[talkerIndex] = updatedTalker;
  await data.write(talkers);
  return updatedTalker;
};

const remove = async ({ id }) => {
  const talkers = await getAll();
  const newTalkers = talkers.filter((talker) => talker.id !== +id);
  await data.write(newTalkers);
};

const search = async ({ q }) => {
  const talkers = await getAll();
  if (!q) return talkers;
  const filter = talkers.filter(({ name }) => name.includes(q));
  if (!filter) return '[]';
  return filter;
};

module.exports = { getAll, getById, create, update, remove, search };