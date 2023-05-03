const mongoose = require("mongoose");

const payment = new mongoose.Schema(
  {
    requestId: {
    type:String,
    required: [true, "request must have id"],

    },

    requestAuthId: {
        type:String,
        required: [true, "request must have auth id"],
        },

    senderDetails: {
        type: Object,
        required: [true, "user must have email"],
      },
      prove: {
        type:String,
        required: [true, "payment must have prove"],
    
        },
      requestDetails: {
        type: Object,
        required: [true, "user must have email"],
      },
      accepted: {
        type:Boolean,
        default:false
        },

        amount: {
            type:Number,
            
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

const Payment = mongoose.model("payment", payment);

module.exports = Payment;
