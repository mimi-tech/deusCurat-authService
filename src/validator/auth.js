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
    emailAddress: Joi.string().required(),
    password: Joi.string().required(),
  },

  updateAccountData: {
    updateEmail: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    gender: Joi.string().valid("male", "female"),
    },

    getCommons:{
      page:Joi.number().required()
    },
  
    getAllNeedy:{
      page:Joi.number().required(),
      type: Joi.string().required(),
    },

    getPayment:{
      page:Joi.number().required(),
      requestId:Joi.string(),
      highestDonors:Joi.string(),
      type:Joi.string(),
      userAuthId:Joi.string()
    },

    getTestimony:{
      page:Joi.number().required()
    },

    adminLogin: {
      emailAddress: Joi.string().required(),
      password: Joi.string().required(),
    },
};
