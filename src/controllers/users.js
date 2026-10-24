const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(next); 
};

const createUser = (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(next);
};

const deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted' });
    })
    .catch(next);
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };