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
      dailyDonation: {
        type: Number,
        default:0
      },
      weeklyDonation: {
        type: Number,
        default:0
      },
      monthlyDonation: {
        type: Number,
        default:0
      },

      yearlyDonation: {
        type: Number,
        default:0
      },

      accountDetails: {
        type: Object
      },
      
      commonId: {
        type: String,
        default:"123456"
      },

      year: {
        type: Number,
        required: [true, "Year is required"],
      },
  
      month: {
        type: Number,
        required: [true, "Month is required"],
      },
      
      monthName: {
        type: String,
        required: [true, "Month name is required"],
      },
  
      week: {
        type: Number,
        required: [true, "Week is required"],
      },
  
      day: {
          type: Number,
          required: [true, "Day is required"],
      },
 
      2023: {
        type: Number,
        default:0
    },
  
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Commons = mongoose.model("commons", commons);

module.exports = Commons;
