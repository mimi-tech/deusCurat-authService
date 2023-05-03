const Joi = require("joi");

module.exports = {
  deuscuratRegistration: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string()
      .required()
      .valid("male", "female"),
    phoneNumber: Joi.string().required(),
    
  },
  
  generalLogin: {
    emailAddress: Joi.string(),
    phoneNumber: Joi.string(),
    password: Joi.string().required(),
  },

  validateUserToken: {
    token: Joi.string().required(),
  },


  updatePassword: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },

  updateAccountData: {
    updateEmail: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    gender: Joi.string().valid("male", "female"),
    },
  
};
