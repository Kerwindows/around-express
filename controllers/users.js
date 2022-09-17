const path = require('path');
const getFileData = require('../helpers/files');

const userDataPath = path.join(
  path.join(__dirname, '../', 'data', 'users.json'),
);

const getUsers = (req, res) => {
  getFileData(userDataPath, res)
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

const getUserById = (req, res) => {
  getFileData(userDataPath, res)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).send({ Message: 'User ID not found' });
    });
};

module.exports = { getUsers, getUserById };
