const { Router } = require("express");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const testimonyRoutes = require("./testimony");
const commonsRoutes = require("./commons");
const needyRoutes = require("./needy")
const paymentRoutes = require("./payment");


const { response } = require("../helpers");

const routes = Router();

routes.use("", authRoutes);
routes.use('/users', usersRoutes);
routes.use('/testimony', testimonyRoutes);
routes.use('/needy', needyRoutes);

routes.use('/commons', commonsRoutes);
routes.use('/payment', paymentRoutes);

routes.use((_, res) => {
  response(res, { status: false, message: "Route not found" }, 404);
});

module.exports = routes;
