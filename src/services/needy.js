/* eslint-disable no-unreachable */
//const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constants } = require("../configs");
const { needyAccount,usersAccount,commons } = require("../models");

/**
 * for creating company account
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

 const createNeedyRequest = async (params) => {
  try {
    const {images,description, title,email, address,video } = params;
   
 //check if company owner has an account
 const isNeedyAccountExisting = await usersAccount.findOne({
  email: email,
  isActive:true
});

if (!isNeedyAccountExisting) {
  return {
    status: false,
    message: "This user does not have a valid account",
  };
}

//check if owner has an account
const isRequestExisting = await needyAccount.findOne({
  email: email,
  
});

if (isRequestExisting) {
  return {
    status: false,
    message: "Sorry we have your request already",
  };
}


  //go ahead and create company account
  const data = await needyAccount.create({
   firstName: isNeedyAccountExisting.firstName,
   lastName: isNeedyAccountExisting.lastName,
   gender:isNeedyAccountExisting.gender,
   email:isNeedyAccountExisting.email,
   userAuthId:isNeedyAccountExisting._id,
   address: address,
   description:description,
   images:images,
   title: title,
   description:description,
   phoneNumber:isNeedyAccountExisting.phoneNumber,
   video:video,
  
  });
 
 
  const common = await commons.findOne();
   common.requestCount = common.requestCount += 1
   common.save()
  return {
    status: true,
    data: data,
    message: "Request created successfully",
  };

  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: constants.SERVER_ERROR("CREATING NEEDY ACCOUNT"),
    };
  }
};




/**
 * for fetching a request
 * @param {Object} params  company id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

const getANeedy = async (params) => {
  const { userAuthId } = params;
  try {
    const needy = await needyAccount.findOne({ userAuthId: userAuthId });

    if (!needy) {
      return {
        status: false,
        message: "Neddy not found",
      };
    }
 
    return {
      status: true,
      data: needy,
    };
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("GETTING A NEEDY"),
    };
  }
};

/**
 * for deleting a NEEDY account
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

 const deleteANeedy = async (params) => {
  try {
    const { userAuthId } = params;

    //check if the user is already existing
    const needy = await needyAccount.findOne({
      userAuthId: userAuthId,
    });

    if (!needy) {
      return {
        status: false,
        message: "Needy does not exist",
      };
    }

    //go ahead and delete the account
    await needyAccount.deleteOne({
      userAuthId: userAuthId,
    });
return {
  status: true,
  message: "Request deleted successfully",
};
  } catch (e) {
    console.log(e)
    return {
      status: false,
      message: constants.SERVER_ERROR("DELETING A NEEDY ACCOUNT"),
    };
  }
};


/**
 * for updating a NEEDY account
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

const updateANeedy = async (params) => {
  try {
    const { userAuthId,title, description, amountNeeded } = params;

    //check if the user is already existing
    const needy = await needyAccount.findOne({
      userAuthId: userAuthId,
    });

    if (!needy) {
      return {
        status: false,
        message: "Needy does not exist",
      };
    }

    //go ahead and update the account
    const filter = {userAuthId: userAuthId,}
    await needyAccount.findOneAndUpdate(filter, {title:title, description:description,amountNeeded:amountNeeded}, {
      new: true,
    });
return {
  status: true,
  message: "Request updated successfully",
};
  } catch (e) {
    console.log(e)
    return {
      status: false,
      message: constants.SERVER_ERROR("UPDATING A NEEDY ACCOUNT"),
    };
  }
};


/**
 * for updating a NEEDY account counts
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

const updateANeedyCount = async (params) => {
  try {
    const { authId, type, userId, amount } = params;
 
    //check if the user is already existing
    const needy = await needyAccount.findOne({
      userAuthId: userId,
    });
      console.log(userId)

    if (!needy) {
      return {
        status: false,
        message: "Needy does not exist",
      };
    }

    if(userId === authId){
      return {
        status: false,
        message: "You cannot react to your own request",
      };
    }

    if(type === "paid"){
      needy.paidCount += 1;
      needy.amountPaid += amount
      await needy.save();
      const common = await commons.findOne();
    common.totalDonation = common.totalDonation += amount
    common.save();
    }

    if(type === "like"){
      needy.likeCount += 1;
      await needy.save();
    }
    
    if(type === "dislike"){
      needy.disLikeCount += 1;
      await needy.save();
    }
return {
  status: true,
  message: `${type} successfully`.toUpperCase(),
};
  } catch (e) {
    console.log(e)
    return {
      status: false,
      message: constants.SERVER_ERROR("UPDATING A NEEDY COUNT"),
    };
  }
};


/**
 * for updating a NEEDY account counts
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

const updateANeedyStatus = async (params) => {
  try {
    const {type, userAuthId } = params;
        //check if the user is active
        const isUser = await usersAccount.findOne({
          _id: userAuthId,
          isActive: true
        });

        if(!isUser){
          return {
            status: false,
            message: "user does not exist",
          }; 
        }
    //check if the user is already existing
    const needy = await needyAccount.findOne({
      userAuthId: userAuthId,
    });

    if (!needy) {
      return {
        status: false,
        message: "Needy does not exist",
      };
    }

    if(type === "approval"){
      if(needy.approvalStatus === true){
        needy.approvalStatus = false;
        needy.approvedDate = new Date();
        await needy.save();
      }else{
        needy.approvalStatus = true;
        await needy.save();
      }
    }

    if(type === "reject"){
      if(needy.rejectStatus === true){
        needy.rejectStatus = false;
        await needy.save();
      }else{
        needy.rejectStatus = true;
        await needy.save();
      }
    }
    
    // if(type === "show"){
    //     needy.showStatus = true;
    //     await needy.save();
      
    // }

    if(type === "display"){
      needy.showStatus = true;
      if(needy.displayStatus === true){
        needy.displayStatus = false;
        await needy.save();
      }else{
        needy.displayStatus = true;
        await needy.save();
      }
    }
return {
  status: true,
  message: `${type} successfully`.toUpperCase(),
};
  } catch (e) {
    console.log(e)
    return {
      status: false,
      message: constants.SERVER_ERROR("UPDATING A NEEDY COUNT"),
    };
  }
};



module.exports = {
  createNeedyRequest,
  getANeedy,
  deleteANeedy,  
  updateANeedy,
  updateANeedyCount,
  updateANeedyStatus
};
