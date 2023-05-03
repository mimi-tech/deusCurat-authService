const mongoose = require("mongoose");

const support = new mongoose.Schema(
  {
    message: {
        type: String,
        required: [true, "Message must be provided"],
      },

      header: {
        type: String,
        required: [true, "header must be provided"],
      },

      userDetails: {
        type: Object,
        required: [true, "header must be provided"],
      },

      dateAdded:{
        type: Date,
        default: new Date()
      }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Support = mongoose.model("support", support);

module.exports = Support;
