const Joi = require("joi");

module.exports = {
  
    addPayment: {
        prove: Joi.string().required(),
        requestId: Joi.string().required(),

        amount: Joi.number().required(),
       

    },

  getPayment:{
    page:Joi.number().required(),
    requestId:Joi.string()
  },

  updatePayment:{
    requestAuthId: Joi.string().required(),
    userAuthId: Joi.string().required(),
    paymentId: Joi.string().required(),

    amount: Joi.number().required()

  },


  deletePayment:{
    paymentId: Joi.string().required(),
  }
}