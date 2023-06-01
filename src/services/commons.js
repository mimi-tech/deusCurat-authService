/* eslint-disable no-unreachable */
//const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const { constants } = require("../configs");
const { commons,support,usersAccount  } = require("../models");
const { generalHelperFunctions } = require("../helpers");



  /**
 * for fetching all commons
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const addCommons  = async (params) => {
    try {
      const {accountDetails} = params;
      const year = generalHelperFunctions.generateYear();
      const month = generalHelperFunctions.generateMonth();
      const week = generalHelperFunctions.generateWeek();
      const day = generalHelperFunctions.generateDay();
      const monthName = generalHelperFunctions.generateMonthName();
      //check if collection exist 

      const doc = await commons.exists();
      if(!doc){
  
      const allCommons = await commons.create({
        accountDetails:accountDetails,
        year:year,
        month:month,
        week:week,
        day:day,
        monthName:monthName
      });
        
  
      if(allCommons){
        return {
          status: true,
          data: allCommons,
          message:"Commons added successfully"
        };
      }
      return {
        status: false,
        message: "Couldn't add common",
      };
    }
    //update common
      

    } catch (e) {
      return {
        status: false,
        message: constants.SERVER_ERROR("ADD COMMONS"),
      };
    }
  };

  

 /**
 * for creating new SUPPORT
 * @param {Object} params  message params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
 const createSupport  = async (params) => {
  try {
    
    const { message, authId, header} = params;


    const user = await usersAccount.findOne(
      { $and: [{ isActive: true }, { _id:authId }] });
    if(!user) {
      return {
        status: false,
        message:"Sorry you are not allowed to create a notification"
      };
    }
    const data = {
      "name": user.firstName + " " + user.lastName,
      "id":user._id,
      "gender": user.gender,
      "phoneNumber": user.phoneNumber,
      "email": user.email
    }

    const details = await support.create({
      message:message,
      userDetails:data,
      header:header
    })

    if(details){
      return {
        status: true,
        message:"Support has been created",
        data:details
      };
    }
    return {
      status: false,
      message:"Sorry support not created succssfully"
    };
  } catch (e) {
    console.error(e);
      return {
        status: false,
        message: constants.SERVER_ERROR("CREATEING SUPPORT"),
      };
    }
  }


/**
 * for getting a support
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const getSupport  = async (params) => {
  try {
    const { page } = params;

    const pageCount = 15;

    const allSupport = await support.find()
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ dateAdded: "desc" })
      .exec();

    if(allSupport){
      return {
        status: true,
        data: allSupport,
      };
    }
    return {
      status: false,
      message: "Couldn't get all support",
    };
   
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("ALL SUPPORT"),
    };
  }
};


/**
 * for deleting a support
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const deleteSupport = async (params) => {
  try {
    const { supportId } = params;
    const allSupport = await support.exists()
      
    if(!allSupport){
      return {
        status: false,
        message:"No support is available",
      };
    }
    const isSupportExisting = await support.findOne({_id:supportId});
    if(!isSupportExisting){
      return {
        status: true,
        message:"Support not existing",
      };
    }
    const details = await support.deleteOne({_id:supportId});
    if(details){
      return {
        status: true,
        message:"Support deleted successfully",
      };
    }
    return {
      status: false,
      message:"Support deleted not successfully",
    };
   
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("DELETING SUPPORT"),
    };
  }
};

  module.exports = {
    addCommons,
    createSupport,
    getSupport,
    deleteSupport
  }