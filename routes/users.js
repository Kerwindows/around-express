const router = require('express').Router();

const { getUsers, getUserById } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.get('/users', getUsers);

// router.get('/users', (res, req) => {
//   console.log(getUsers());
// });

module.exports = router;
