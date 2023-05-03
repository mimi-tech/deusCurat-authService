const { Router } = require("express");
const { auth } = require("../controllers");
const { validate } = require("../middlewares");
const { auth: validator } = require("../validator");

const routes = Router();

routes.get("/", auth.welcomeText);

routes.post(
  "/create-account",
  validate(validator.deuscuratRegistration),
  auth.deuscuratRegistration
);

routes.post(
  "/login",
  validate(validator.generalLogin),
  auth.generalLogin
);

routes.post(
  "/validate-user-token",
  validate(validator.validateUserToken),
  auth.validateUserToken
);


routes.put(
  "/update-password",
  validate(validator.updatePassword),
  auth.updatePassword
);

routes.put(
  "/update-account-data",
  validate(validator.updateAccountData),
  auth.updateAccountData
);

module.exports = routes;
