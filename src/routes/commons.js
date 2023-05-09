const { Router } = require("express");
const { commons } = require("../controllers");
const { validate } = require("../middlewares");
const { commons: validator } = require("../validator");

const routes = Router();

routes.post(
  "/add-commons",
  validate(validator.addCommons),
  commons.addCommons
);


routes.post(
  "/create-support",
  validate(validator.createSupport),
  commons.createSupport
);
routes.get(
  "/get-support",
  validate(validator.getSupport),
  commons.getSupport
);
routes.delete(
  "/delete-support",
  validate(validator.deleteSupport),
  commons.deleteSupport
);


module.exports = routes;
