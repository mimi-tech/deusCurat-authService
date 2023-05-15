const { Router } = require("express");
const { payment } = require("../controllers");
const { validate } = require("../middlewares");
const { payment: validator } = require("../validator");

const routes = Router();

routes.post(
  "/add-payment",
  validate(validator.addPayment),
  payment.addPayment
);


routes.delete(
  "/delete-payment",
  validate(validator.deletePayment),
  payment.deletePayment
);
routes.put(
  "/update-payment",
  validate(validator.updatePayment),
  payment.updatePayment
);



module.exports = routes;
