/* eslint-disable no-unreachable */
//const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constants } = require("../configs");
const { usersAccount  } = require("../models");


/**
 * for deleting an account using the users ID
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

 const deleteAUser = async (params) => {
  try {
    const { userAuthId } = params;

    //check if the user is already existing
    const user = await usersAccount.findOne({
      _id: userAuthId,
    });

    if (!user) {
      return {
        status: false,
        message: "User does not exist",
      };
    }
    
     //go ahead and delete the account
    await usersAccount.deleteOne({
      _id: userAuthId,
    });

    return {
      status: true,
      message: "account deleted successfully",
    };
    
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("DELETING CHURCH APP ACCOUNT"),
    };
  }
};

/**
 * for deleting an account using the users ID
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

 const blockAndUnblockUser = async (params) => {
  try {
    const { accountId } = params;
 
    
    //check if the user is already existing
    const user = await usersAccount.findOne({
      _id: accountId,
    });

    if (!user) {
      return {
        status: false,
        message: "User does not exist",
      };
    }

    //go ahead and activate or deactivate the account
    if(user.isActive === true){
      user.isActive = false
      user.save();
      
    return {
      status: true,
      data:user,
      message: "account de-activated successfully",
    };
  }

  if(user.isActive === false){
    user.isActive = true
    user.save();
    
  return {
    status: true,
    data:user,
    message: "account activated successfully",
  };
}


  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("BLOCKING OR UNBLOCKING USER ACCOUNT"),
    };
  }
};


/**
 * for fetching all users
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
 const getAllUsers = async (params) => {
  try {
    const { page, type } = params;

    const pageCount = 15;

     if(type === "all"){
    const allUsers = await usersAccount.find()
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ createdAt: "desc" });

     if(allUsers){
      return {
        status: true,
        data: allUsers,
      };
     }
    }

    if(type === "blocked"){
      const allUsers = await usersAccount.find({isActive: false})
        .limit(pageCount)
        .skip(pageCount * (page - 1))
        .sort({ createdAt: "desc" });
  
       if(allUsers){
        return {
          status: true,
          data: allUsers,
        };
       }
      }

    return {
      status: false,
      message:"Couldn't find any users",
    };
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("ALL USERS"),
    };
  }
};

/**
 * for fetching a user
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

const getAUser = async (params) => {
  const { authId,userEmail } = params;
  try {
    const user = await usersAccount.findOne(
      { $or: [{ email: userEmail }, { _id:authId }] });

    if (!user) {
      return {
        status: false,
        message: "User not found",
      };
    }
//send emailCode to user email
    
const publicData = {
  id: user._id,
  email: user.email,
  phoneNumber: user.phoneNumber,
  firstName: user.firstName,
  lastName: user.lastName,
  gender: user.gender,
  isActive:user.isActive,
  createdAt: user.createdAt,
};
    return {
      status: true,
      data: publicData,
    };
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("GETTING A USER"),
    };
  }
};



/**
 * To get all users that are following a church.
 * @param {Object} params  payload
 * @returns {Promise<Object>} Contains status, and returns message
 */
 const searchUsers = async (params) => {
  
    try {
      const { page, searchQuery, accountType } = params;
  
      const pageCount = 50;

      const composedQuery = {
        $or: [
          { username: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
          { firstName: { $regex: searchQuery, $options: "i" } },
        ],
      };
      const searchResult = await usersAccount.find(composedQuery)
        .limit(pageCount)
        .skip(pageCount * (page - 1))
        .sort({ createdAt: "desc" });
  
      return {
        status: true,
        message: "search was successful",
        data: searchResult,
      };
    } catch (e) {
      return {
        status: false,
        message: constants.SERVER_ERROR("SEARCH ALL USERS"),
      };
    }
  
  };



   /**
 * for admin  account
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

 const createAdmin = async (params) => {
  try {
    const { adminId, } = params;

    //check if the user is already existing
    const personnels = await usersAccount.findOne({
      _id: adminId,
      isAdmin: false,
      isActive:true
    });

    if (!personnels) {
      return {
        status: false,
        message: "Admin does not exist",
      };
    }
    
 //go ahead and suspend the account
 
const filter = { _id: adminId};
    const updatepersonnel = await usersAccount.findOneAndUpdate(
      filter,
      { isAdmin: personnels.isAdmin === true?false:true},
      {
        new: true,
      }
    );
    if(!updatepersonnel){
      return {
        status: false,
        message: "Error updating personnel",
      };
         
    }

 return {
   status: true,
   message: personnels.isActive === false?"User is now an admin":"User is no longer an admin",
 };
    

   
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("Creating ADMIN ACCOUNT"),
    };
  }
};


module.exports = {
  deleteAUser,
  blockAndUnblockUser,
  getAllUsers,
  getAUser,
  searchUsers,
  createAdmin
};
