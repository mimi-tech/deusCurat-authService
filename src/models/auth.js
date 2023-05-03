const mongoose = require("mongoose");

const usersAccount = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "user must have email"],
    },

    password: {
      type: String,
      required: [true, "user must have a password"],
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

    isActive: {
      type: Boolean,
      default: true,
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

const UsersAccount = mongoose.model("usersAccount", usersAccount);

module.exports = UsersAccount;
