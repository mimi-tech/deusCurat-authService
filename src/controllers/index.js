const { commons } = require("../models");

/* eslint-disable global-require */
module.exports = {
    auth: require("./auth"),
    users: require("./users"),
    testimony: require("./testimony"),
    commons:require("./commons"),
    needy:require("./needy"),
    payment:require("./payment"),
  };
  