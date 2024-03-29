const Joi = require("joi");

module.exports = {
  
  deleteAUser: {
    userAuthId: Joi.string().required()
  },

  blockAndUnblockUser: {
    accountId: Joi.string().required()
  },

  getAllUsers: {
    page: Joi.number().required(),
    type: Joi.string().required().valid( "blocked", "all","admin"),

  },

  getAUser: {
    userEmail: Joi.string()
  },
  

  searchUsers: {
      page: Joi.number().required(),
      searchQuery: Joi.string().required(),
  },
  
  createAdmin: {
    adminEmail: Joi.string().required()
  },
  
};
