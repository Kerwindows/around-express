const path = require('path');
const getFileData = require('../helpers/files');

const cardDataPath = path.join(__dirname, '../', 'data', 'cards.json');

const getCards = (req, res) => getFileData(cardDataPath, res)
  .then((cards) => res.send(cards))
  .catch(() => {
    res.status(500).send({ Message: 'Internal Error' });
  });

module.exports = getCards;
