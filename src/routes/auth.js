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

routes.get(
  "/get-commons",
  validate(validator.getCommons),
  auth.getCommons
);

routes.get(
  "/get-all-needy",
  validate(validator.getAllNeedy),
  auth.getAllNeedy
);

routes.get(
  "/get-payment",
  validate(validator.getPayment),
  auth.getPayment
);

routes.get(
  "/get-testimony",
  validate(validator.getTestimony),
  auth.getTestimony
);

routes.post(
  "/admin-login",
  validate(validator.adminLogin),
  auth.adminLogin
);

module.exports = routes;
