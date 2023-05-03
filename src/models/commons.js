const mongoose = require("mongoose");

const commons = new mongoose.Schema(
  {
    testimonyCount: {
        type: Number,
        default:0
      },

      requestCount: {
        type: Number,
        default:0
      },

      totalDonation: {
        type: Number,
        default:0
      },

      accountDetails: {
        type: Object
      },
      
      commonId: {
        type: String,
        default:"123456"
      }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Commons = mongoose.model("commons", commons);

module.exports = Commons;
