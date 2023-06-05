const Joi = require("joi");

module.exports = {
  
    createTestimony: {
        imagesAfter: Joi.string().required(),
        userAuthId: Joi.string().required(),
        videoAfter: Joi.string().required(),
        testimonyTitle: Joi.string().required(),
        testimonyDesc: Joi.string().required(),
  },

 

  deleteTestimony:{
    testimonyId: Joi.string().required(),
  },
  getATestimony: {
    testimonyId: Joi.string(),
    userAuthId: Joi.string()

  }
  
}