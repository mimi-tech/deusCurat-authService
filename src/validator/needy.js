const Joi = require("joi");

module.exports = {
  
    createNeedyRequest: {
        images: Joi.string().required(),
        video: Joi.string().required(),
        description: Joi.string().required(),
        title: Joi.string().required(),
        address: Joi.string().required(),

  },

  

  deleteANeedy:{
    userAuthId: Joi.string().required(),
  },

  updateANeedy:{
    userAuthId: Joi.string().required(),
    title:Joi.string().required(),
    description:Joi.string().required(),
    amountNeeded:Joi.number().required(),

  },

  updateANeedyCount:{
    userId: Joi.string().required(),
    type:Joi.string().required().valid("paid", "like","dislike"),
    amount:Joi.number()
  },

  getANeedy:{
    userAuthId: Joi.string().required(),

  },

  updateANeedyStatus:{
    userAuthId: Joi.string().required(),
    type:Joi.string().required().valid("approval", "reject","show","display"),

  },
  
}