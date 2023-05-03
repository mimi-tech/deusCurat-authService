const { Router } = require("express");
const { needy } = require("../controllers");
const { validate } = require("../middlewares");
const { needy: validator } = require("../validator");

const routes = Router();

routes.post(
  "/create-needy-account",
  validate(validator.createNeedyRequest),
  needy.createNeedyRequest
);

routes.get(
  "/get-all-needy",
  validate(validator.getAllNeedy),
  needy.getAllNeedy
);

routes.get(
  "/get-a-needy-account",
  validate(validator.getANeedy),
  needy.getANeedy
);

routes.delete(
    "/delete-a-needy-account",
    validate(validator.deleteANeedy),
    needy.deleteANeedy
  );

  routes.put(
    "/update-a-needy-account",
    validate(validator.updateANeedy),
    needy.updateANeedy
  );

  routes.put(
    "/update-a-needy-account-count",
    validate(validator.updateANeedyCount),
    needy.updateANeedyCount
  );

  routes.put(
    "/update-a-needy-account-status",
    validate(validator.updateANeedyStatus),
    needy.updateANeedyStatus
  );


module.exports = routes;
