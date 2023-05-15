const mongoose = require("mongoose");

const testimony = new mongoose.Schema(
  {
    email: {
      type: String,
      unique:true,
      required: [true, "user must have email"],
    },

    userAuthId: {
        type: String,
        unique:true,
        required: [true, "user must have an id"],
      },

    firstName: {
      type: String,
      required: [true, "user must have a last name"],
    },

    lastName: {
      type: String,
      required: [true, "user must have first name"],
    },


    gender: {
      type: String,
      required: [true, "user must have a gender"],
    },

    address: {
        type: String,
        required: [true, "user must have an address"],
      },

    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "user must have a phone number"],
    },

    contributionCount: {
      type: Number,
     
    },

    requestCount: {
      type: Number,
  
    },
   
    title: {
      type: String,
      required: [true, "Request must have a title"],

    },  
    description: {
        type: String,
        required: [true, "Request must have a decription"],
  
      },  
      imagesBefore: {
        type: String,
        required: [true, "Request must have a photo"],
  
      },  
      
      imagesAfter: {
        type: String,
        required: [true, "Request must have a after image"],
  
      },  

      videoBefore: {
        type: String,
        required: [true, "Request must have a photo"],
  
      },  
      
      videoAfter: {
        type: String,
        required: [true, "Request must have a after image"],
  
      },  
      
    approvalStatus: {
     type:Boolean,
     default: true
    },

    paidCount: {
        type: Number,
        required: [true, "Request must have a paid count"],

      },
  
      likeCount: {
        type: Number,
        required: [true, "Request must have a like count"],
      },

      disLikeCount: {
        type: Number,
        required: [true, "Request must have a dislike count"],
      },

        amountNeeded: {
        type: Number,
        required: [true, "Request must have a amount needed"],
      },

      amountPaid: {
        type: Number,
        required: [true, "Request must have a amount paid"],
      },

    createdAt: {
      type: Date,
      default: new Date()
    }

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Testimony = mongoose.model("testimony", testimony);

module.exports = Testimony;
