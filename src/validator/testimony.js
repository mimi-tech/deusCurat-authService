const Joi = require("joi");

module.exports = {
  
    createTestimony: {
        imagesAfter: Joi.array().required(),
        userAuthId: Joi.string().required(),

  },

  getTestimony:{
    page:Joi.number().required()
  },

  deleteTestimony:{
    testimonyId: Joi.string().required(),
  },
  getATestimony: {
    testimonyId: Joi.string(),
    userAuthId: Joi.string()

  }
  
}