/* eslint-disable no-unreachable */
//const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const { constants } = require("../configs");
const { payment,needyAccount,usersAccount,commons  } = require("../models");

/**
 * for fetching all commons
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const getPayment  = async (params) => {
    try {
      const { page, requestId } = params;
  
      const pageCount = 15;
      if(requestId){
        const allCommons = await payment.find({requestAuthId:requestId})
        .limit(pageCount)
        .skip(pageCount * (page - 1))
        .sort({ createdAt: "desc" })
        .exec();
  
      if(allCommons){
        return {
          status: true,
          data: allCommons,
        };
      }
      }
      const allCommons = await payment.find()
        .limit(pageCount)
        .skip(pageCount * (page - 1))
        .sort({ createdAt: "desc" })
        .exec();
  
      if(allCommons){
        return {
          status: true,
          data: allCommons,
        };
      }
      return {
        status: false,
        message: "Couldn't get all payment",
      };
     
    } catch (e) {
      return {
        status: false,
        message: constants.SERVER_ERROR("ALL Payment"),
      };
    }
  };

  /**
 * for fetching all commons
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const addPayment  = async (params) => {
    try {
      const {prove,authId,requestId,amount} = params;
  
//check if  account is already registered
const userAccount = await usersAccount.findOne({
    _id: authId,
    isActive:true
  });

  if (!userAccount) {
    return {
      status: false,
      message: "User doesn't exist",
    };
  }

  //check if  account is already registered
const isRequest = await needyAccount.findOne({
    _id: requestId,
  });
  if (!isRequest) {
    return {
      status: false,
      message: "Request doesn't exist",
    };
  }

      const sender = {
       firstName:userAccount.firstName,
       lastName:userAccount.lastName,
       gender:userAccount.gender,
       phoneNumber:userAccount.phoneNumber,
      }

      const requestDetails = {
        needyName:isRequest.firstName + " " + isRequest.lastName,
        needyGender: isRequest.gender
      }
      const allCommons = await payment.create({
        prove:prove,
        requestId:requestId,
        requestAuthId: isRequest.userAuthId,
        senderDetails:sender,
        requestDetails:requestDetails,
        amount:amount
      });
        
  
      if(allCommons){
        return {
          status: true,
          data: allCommons,
          message:"Payment added successfully"
        };
      }
      
      

    } catch (e) {
      return {
        status: false,
        message: constants.SERVER_ERROR("ADD COMMONS"),
      };
    }
  };

  

/**
 * for deleting a support
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const deletePayment = async (params) => {
  try {
    const { paymentId } = params;
      
    
    const isSupportExisting = await payment.findOne({_id:paymentId});
    if(!isSupportExisting){
      return {
        status: true,
        message:"Payment not existing",
      };
    }
    const details = await payment.deleteOne({_id:paymentId});
    if(details){
      return {
        status: true,
        message:"Payment deleted successfully",
      };
    }
    return {
      status: false,
      message:"Payment deleted not successfully",
    };
   
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("DELETING SUPPORT"),
    };
  }
};


/**
 * for updating a NEEDY account counts
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */

const updatePayment = async (params) => {
    try {
      const { requestAuthId, amount, userAuthId , paymentId} = params;
  
      //check if the user is already existing
      const needy = await needyAccount.findOne({
        userAuthId: requestAuthId,
      });
  
      if (!needy) {
        return {
          status: false,
          message: "Needy does not exist",
        };
      }
  
      //check if  account is already registered
     const userAccount = await usersAccount.findOne({
    _id: userAuthId,
    isActive:true
  });

  if (!userAccount) {
    return {
      status: false,
      message: "User doesn't exist",
    };
  }

  //check if  account is already registered
  const payments = await payment.findOne({
    _id: paymentId,
  });

  if (!payments) {
    return {
      status: false,
      message: "Payment doesn't exist",
    };
  }
      
  
        needy.paidCount += 1;
        needy.amountPaid += amount
        await needy.save();
        const common = await commons.findOne();
      common.totalDonation = common.totalDonation += amount
      common.save();

      userAccount.contributionCount =  userAccount.contributionCount += 1
      userAccount.save();

      payments.accepted = true;
      payments.save();
  
  return {
    status: true,
    message: `Approved successfully`.toUpperCase(),
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
    addPayment,
    getPayment,
    deletePayment,
    updatePayment
  }