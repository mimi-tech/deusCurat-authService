const { payment } = require("../services");
const { response } = require("../helpers");


const addPayment = async (req, res) => {
    const data = await payment.addPayment(req.form);
    return response(res, data);
  }


  const deletePayment = async (req, res) => {
    const data = await payment.deletePayment(req.form);
    return response(res, data);
  }

  const updatePayment = async (req, res) => {
    const data = await payment.updatePayment(req.form);
    return response(res, data);
  }


  module.exports = {
    addPayment,
    deletePayment,
    updatePayment,
  }
  