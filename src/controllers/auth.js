const { auth } = require("../services");
const { response } = require("../helpers");

const welcomeText = async (req, res) => {
  const data = await auth.welcomeText(req.form);
  return response(res, data);
};

const deuscuratRegistration = async (req, res) => {
  const data = await auth.deuscuratRegistration(req.form);
  return response(res, data);
};

const generalLogin = async (req, res) => {
  const data = await auth.generalLogin(req.form);
  return response(res, data);
};

const validateUserToken = async (req, res) => {
  const data = await auth.validateUserToken(req.form);
  return response(res, data);
};


const updatePassword = async (req, res) => {
  const data = await auth.updatePassword(req.form);
  return response(res, data);
};

const updateAccountData = async (req, res) => {
  const data = await auth.updateAccountData(req.form);
  return response(res, data);
}
  

const getCommons = async (req, res) => {
  const data = await auth.getCommons(req.form);
  return response(res, data);
}
const getAllNeedy = async (req, res) => {
  const data = await auth.getAllNeedy(req.form);
  return response(res, data);
}

const getTestimony = async (req, res) => {
  const data = await auth.getTestimony(req.form);
  return response(res, data);
}
const getPayment = async (req, res) => {
  const data = await auth.getPayment(req.form);
  return response(res, data);
}




module.exports = {
  welcomeText,
  deuscuratRegistration,
  generalLogin,
  validateUserToken,
  updatePassword,
  updateAccountData,
  getCommons,
  getAllNeedy,
  getTestimony,
  getPayment
};
