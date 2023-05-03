/* eslint-disable no-unreachable */
//const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const { constants } = require("../configs");
const { testimony,usersAccount,needyAccount,commons  } = require("../models");
  

 /**
 * for creating new testimony
 * @param {Object} params  message params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
 const createTestimony  = async (params) => {
  try {
    
    const {imagesAfter,userAuthId} = params;


    const user = await usersAccount.findOne(
      { $and: [{ isActive: true }, { _id:userAuthId }] });
    if(!user) {
      return {
        status: false,
        message:"Sorry this account is not active"
      };
    }

    const isNeedyAccountExisting = await needyAccount.findOne({userAuthId:userAuthId});
      if(!user) {
        return {
          status: false,
          message:"Sorry this account is not active"
        };
      }

    const details = await testimony.create({
        firstName: isNeedyAccountExisting.firstName,
        lastName: isNeedyAccountExisting.lastName,
        gender:isNeedyAccountExisting.gender,
        email:isNeedyAccountExisting.email,
        userAuthId:isNeedyAccountExisting._id,
        address: isNeedyAccountExisting.address,
        description:isNeedyAccountExisting.description,
        images:isNeedyAccountExisting.images,
        title: isNeedyAccountExisting.title,
        description:isNeedyAccountExisting.description,
        phoneNumber:isNeedyAccountExisting.phoneNumber,
         imagesAfter:imagesAfter,
         likeCount:isNeedyAccountExisting.likeCount,
         disLikeCount:isNeedyAccountExisting.disLikeCount,
        amountNeeded:isNeedyAccountExisting.amountNeeded,
         amountPaid:isNeedyAccountExisting.amountPaid,
         paidCount:isNeedyAccountExisting.paidCount,

    })
    const common = await commons.findOne();
    common.testimonyCount = common.testimonyCount += 1
     common.save()
    if(details){
      return {
        status: true,
        message:"Testimony has been created",
        data:details
      };
    }
    return {
      status: false,
      message:"Testimony not created succssfully"
    };
  } catch (e) {
    console.error(e);
      return {
        status: false,
        message: constants.SERVER_ERROR("CREATEING TESTIMONY"),
      };
    }
  }


/**
 * for getting a support
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const getTestimony  = async (params) => {
  try {
    const { page } = params;

    const pageCount = 15;

    const allTestimony = await testimony.find()
      .limit(pageCount)
      .skip(pageCount * (page - 1))
      .sort({ dateAdded: "desc" })
      .exec();

    if(allTestimony){
      return {
        status: true,
        data: allTestimony,
      };
    }
    return {
      status: false,
      message: "Couldn't get all testimonies",
    };
   
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("ALL TESTIMONY"),
    };
  }
};


/**
 * for getting a testimony
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const getATestimony  = async (params) => {
  try {
    const { testimonyId, userAuthId } = params;
    const testimonyExist = await testimony.findOne(
      { $or: [{ _id: testimonyId }, { userAuthId:testimonyId }] });


    if(testimonyExist){
      return {
        status: true,
        data: testimonyExist,
      };
    }
    return {
      status: false,
      message: "Couldn't get testimonies",
    };
   
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("A TESTIMONY"),
    };
  }
};


/**
 * for deleting a support
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const deleteTestimony = async (params) => {
  try {
    const { testimonyId } = params;
    const allSupport = await testimony.exists()
      
    if(!allSupport){
      return {
        status: false,
        message:"No support is available",
      };
    }

    const details = await testimony.deleteOne({_id:testimonyId});
    if(details){
      return {
        status: true,
        message:"Testimony deleted successfully",
      };
    }
    return {
      status: false,
      message:"Testimony deleted not successfully",
    };
   
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("DELETING TESTIMONY"),
    };
  }
};

  module.exports = {
    createTestimony,
    getTestimony,
    deleteTestimony,
    getATestimony
  }