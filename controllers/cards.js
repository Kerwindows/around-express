const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail() // throws a DocumentNotFoundError
    .then((cardData) => {
      res.send(cardData); // skipped, because an error was thrown
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const createCard = (req, res) => {
  // eslint-disable-next-line no-console
  console.log("Owner_id:",req.user._id); 
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Please submit a name and a valid URL' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No card with that ID found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data request' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,{ likes: req.user._id }
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No card with that ID found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data request' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,{ likes: req.user._id }
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'No card with that ID found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data request' });
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
