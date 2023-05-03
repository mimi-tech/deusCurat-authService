const mongoose = require("mongoose");

const needyAccount = new mongoose.Schema(
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
      default:0
    },

    requestCount: {
      type: Number,
      default:0
    },
   
    title: {
      type: String,
      required: [true, "Request must have a title"],

    },  
    description: {
        type: String,
        required: [true, "Request must have a decription"],
  
      },  
      images: {
        type: Array,
        required: [true, "Request must have a photo"],
  
      },  
      
      
    approvalStatus: {
     type:Boolean,
     default: false
    },

    rejectStatus: {
        type:Boolean,
        default: false
       },

    showStatus: {
        type:Boolean,
        default: false
    },

    displayStatus: {
        type:Boolean,
        default: false
    },

    paidCount: {
        type: Number,
        default:0
      },
  
      likeCount: {
        type: Number,
        default:0
      },

      disLikeCount: {
        type: Number,
        default:0
      },

        amountNeeded: {
        type: Number,
        default:0
      },

      amountPaid: {
        type: Number,
        default:0
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

const NeedyAccount = mongoose.model("needyAccount", needyAccount);

module.exports = NeedyAccount;
