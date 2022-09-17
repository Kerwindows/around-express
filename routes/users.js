const router = require("express").Router();

const { getUsers, getUserById } = require("../controllers/users");

router.get("/:id", getUserById);

router.get("/users", getUsers);

module.exports = router;
