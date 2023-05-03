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
    const {images,description, title,email, address } = params;
   
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
 * for fetching all NEEDY
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
 const getAllNeedy = async (params) => {
  try {
    const { page, type } = params;

    const pageCount = 15;
      if(type === "all"){
        const allRequest = await needyAccount.find()
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ createdAt: "desc" })
      .exec();

    return {
      status: true,
      data: allRequest,
    };
      }
    
   if(type  == "rejected"){
    const allRequest = await needyAccount.find({rejectStatus:true})
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ createdAt: "desc" })
      .exec();

    return {
      status: true,
      data: allRequest,
    };
   }

   if(type  == "approval"){
    const allRequest = await needyAccount.find({approvalStatus:true})
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ createdAt: "desc" })
      .exec();

    return {
      status: true,
      data: allRequest,
    };
   }

   if(type  == "not approval"){
    const allRequest = await needyAccount.find({approvalStatus:false,rejectStatus:false,showStatus:false})
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ createdAt: "asc" })
      .exec();

    return {
      status: true,
      data: allRequest,
    };
   }


   if(type  == "display"){
    const allRequest = await needyAccount.find({displayStatus:true})
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ createdAt: "desc" })
      .exec();

    return {
      status: true,
      data: allRequest,
    };
   }

   if(type  == "showed"){
    const allRequest = await needyAccount.find({showStatus:true})
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ createdAt: "desc" })
      .exec();

    return {
      status: true,
      data: allRequest,
    };
   }

  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("ALL COMPANIES"),
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
    const { authId, type, userAuthId, amount } = params;

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

    if(userAuthId === authId){
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
    
    if(type === "show"){
        needy.showStatus = true;
        await needy.save();
      
    }

    if(type === "display"){
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
  getAllNeedy,
  getANeedy,
  deleteANeedy,  
  updateANeedy,
  updateANeedyCount,
  updateANeedyStatus
};
