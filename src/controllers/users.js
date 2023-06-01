const { users } = require("../services");
const { response } = require("../helpers");

const deleteAUser = async (req, res) => {
  const data = await users.deleteAUser(req.form);
  return response(res, data);
}

const blockAndUnblockUser = async (req, res) => {
  const data = await users.blockAndUnblockUser(req.form);
  return response(res, data);
}

const getAllUsers = async (req, res) => {
  const data = await users.getAllUsers(req.form);
  return response(res, data);
}

const getAUser = async (req, res) => {
  const data = await users.getAUser(req.form);
  return response(res, data);
}


const searchUsers = async (req, res) => {
  const data = await users.searchUsers(req.form);
  return response(res, data);
};

const createAdmin = async (req, res) => {
  const data = await users.createAdmin(req.form);
  return response(res, data);
}

module.exports = {
  deleteAUser,
  blockAndUnblockUser,
  getAllUsers,
  getAUser,
  searchUsers,
  createAdmin
};
