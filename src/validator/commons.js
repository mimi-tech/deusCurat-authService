const Joi = require("joi");

module.exports = {
  
  addCommons: {
    accountDetails: Joi.object({
      accountName: Joi.string().required(),
      accountNumber: Joi.number().required(),
      bankName: Joi.string().required(),
  }).required(),
  },

  getCommons:{
    page:Joi.number().required()
  },

  createSupport:{
    message: Joi.string().required(),
    header: Joi.string().required()
  },

  getSupport:{
    page: Joi.number().required(),
  },

  deleteSupport:{
    supportId: Joi.string().required(),
  }
}