const { needy } = require("../services");
const { response } = require("../helpers");

const createNeedyRequest = async (req, res) => {
  const data = await needy.createNeedyRequest(req.form);
  return response(res, data);
}

const getAllNeedy = async (req, res) => {
    const data = await needy.getAllNeedy(req.form);
    return response(res, data);
  }

  const getANeedy = async (req, res) => {
    const data = await needy.getANeedy(req.form);
    return response(res, data);
  }

  const deleteANeedy = async (req, res) => {
    const data = await needy.deleteANeedy(req.form);
    return response(res, data);
  }

  const updateANeedy = async (req, res) => {
    const data = await needy.updateANeedy(req.form);
    return response(res, data);
  }

  const updateANeedyCount = async (req, res) => {
    const data = await needy.updateANeedyCount(req.form);
    return response(res, data);
  }


  const updateANeedyStatus = async (req, res) => {
    const data = await needy.updateANeedyStatus(req.form);
    return response(res, data);
  }

  module.exports = {
    createNeedyRequest,
    getAllNeedy,
    getANeedy,
    deleteANeedy,
    updateANeedy,
    updateANeedyCount,
    updateANeedyStatus
  }
  