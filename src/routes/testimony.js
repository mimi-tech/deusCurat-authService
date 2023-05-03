const { Router } = require("express");
const { testimony } = require("../controllers");
const { validate } = require("../middlewares");
const { testimony: validator } = require("../validator");

const routes = Router();



routes.post(
  "/create-testimony",
  validate(validator.createTestimony),
  testimony.createTestimony
);
routes.get(
  "/get-testimony",
  validate(validator.getTestimony),
  testimony.getTestimony
);
routes.delete(
  "/delete-testimony",
  validate(validator.deleteTestimony),
  testimony.deleteTestimony
);

routes.get(
  "/get-a-testimony",
  validate(validator.getATestimony),
  testimony.getATestimony
);


module.exports = routes;
