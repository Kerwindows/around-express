const Card = require('../models/card');
const {
  HTTP_CLIENT_ERROR_NOT_FOUND,
  HTTP_CLIENT_BAD_REQUEST,
  SERVERSIDE_ERROR,
} = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
    .orFail() // throws a DocumentNotFoundError
    .then((cardData) => {
      res.send(cardData); // skipped, because an error was thrown
    })
    .catch(() => {
      res.status(SERVERSIDE_ERROR).send({ Message: 'Internal Error' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(HTTP_CLIENT_BAD_REQUEST)
          .send({ message: 'Please submit a name and a valid URL' });
      } else {
        res.status(SERVERSIDE_ERROR).send({ Message: 'Internal Error' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: 'No card with that ID found' });
      } else if (error.name === 'CastError') {
        res
          .status(HTTP_CLIENT_BAD_REQUEST)
          .send({ message: 'Invalid data request' });
      } else {
        res.status(SERVERSIDE_ERROR).send({ Message: 'Internal Error' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: 'No card with that ID found' });
      } else if (error.name === 'CastError') {
        res
          .status(HTTP_CLIENT_BAD_REQUEST)
          .send({ message: 'Invalid data request' });
      } else {
        res.status(SERVERSIDE_ERROR).send({ Message: 'Internal Error' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: 'No card with that ID found' });
      } else if (error.name === 'CastError') {
        res
          .status(HTTP_CLIENT_BAD_REQUEST)
          .send({ message: 'Invalid data request' });
      } else {
        res.status(SERVERSIDE_ERROR).send({ Message: 'Internal Error' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
