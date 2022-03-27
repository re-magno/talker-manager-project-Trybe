const talker = require('../services/talkerServices');

const getAll = (_req, res, next) => talker.getAll()
  .then((data) => res.status(200).json(data))
  .catch((err) => next(err));

const getById = (req, res, next) => talker.getById(req.params)
  .then((data) => res.status(200).json(data))
  .catch((err) => next(err));

const create = (req, res, next) => talker.create(req.body)
  .then((data) => res.status(201).json(data))
  .catch((err) => next(err));

const update = (req, res, next) => talker.update(req.body, req.params)
  .then((data) => res.status(200).json(data))
  .catch((err) => next(err));

const remove = (req, res, next) => talker.remove(req.params)
  .then(() => res.status(204).end())
  .catch((err) => next(err));

const search = (req, res, next) => talker.search(req.body)
  .then((data) => res.status(200).json(data))
  .catch((err) => next(err));

module.exports = { getAll, getById, create, update, remove, search };
