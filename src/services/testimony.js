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
    
    const {imagesAfter,userAuthId,videoAfter,testimonyTitle,testimonyDesc} = params;


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
       console.log(isNeedyAccountExisting);
    const details = await testimony.create({
        firstName: isNeedyAccountExisting.firstName,
        lastName: isNeedyAccountExisting.lastName,
        gender:isNeedyAccountExisting.gender,
        email:isNeedyAccountExisting.email,
        userAuthId:isNeedyAccountExisting._id,
        address: isNeedyAccountExisting.address,
        description:isNeedyAccountExisting.description,
        imagesBefore:isNeedyAccountExisting.images,
        videoBefore:isNeedyAccountExisting.video,
        videoAfter:videoAfter,
        title: isNeedyAccountExisting.title,
        description:isNeedyAccountExisting.description,
        phoneNumber:isNeedyAccountExisting.phoneNumber,
         imagesAfter:imagesAfter,
         likeCount:isNeedyAccountExisting.likeCount,
         disLikeCount:isNeedyAccountExisting.disLikeCount,
        amountNeeded:isNeedyAccountExisting.amountNeeded,
         amountPaid:isNeedyAccountExisting.amountPaid,
         paidCount:isNeedyAccountExisting.paidCount,
         testimonyDesc:testimonyDesc,
         testimonyTitle:testimonyTitle

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
 * for getting a testimony
 * @param {Object} params  pageNumber params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const getATestimony  = async (params) => {
  try {
    const { testimonyId, userAuthId } = params;
    const testimonyExist = await testimony.findOne(
      { $or: [{ _id: testimonyId }, { userAuthId:testimonyId }] });


      if(!testimonyExist){
        return {
         status: false,
         message: "Couldn't get testimonies",
       }; 
       }
       return {
         status: true,
         data: testimonyExist,
       };
   
  } catch (e) {
    console.l
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
    console.log(e);
    return {
      status: false,
      message: constants.SERVER_ERROR("DELETING TESTIMONY"),
    };
  }
};

  module.exports = {
    createTestimony,
    deleteTestimony,
    getATestimony
  }