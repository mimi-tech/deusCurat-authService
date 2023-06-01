const { Router } = require("express");
const { users } = require("../controllers");
const { validate } = require("../middlewares");
const { users: validator } = require("../validator");

const routes = Router();

routes.delete(
  "/delete-account",
  validate(validator.deleteAUser),
  users.deleteAUser
);

routes.put(
  "/account-status",
  validate(validator.blockAndUnblockUser),
  users.blockAndUnblockUser
);

routes.get(
  "/get-all-users",
  validate(validator.getAllUsers),
  users.getAllUsers
);

routes.get(
  "/get-a-user",
  validate(validator.getAUser),
  users.getAUser
);


routes.get(
  "/search-user",
  validate(validator.searchUsers),
  users.searchUsers
);


routes.put(
  "/create-admin",
  validate(validator.searchUsers),
  users.searchUsers
);




module.exports = routes;
