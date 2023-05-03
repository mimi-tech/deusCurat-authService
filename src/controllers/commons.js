const { commons } = require("../services");
const { response } = require("../helpers");

const addCommons = async (req, res) => {
  const data = await commons.addCommons(req.form);
  return response(res, data);
}

const getCommons = async (req, res) => {
    const data = await commons.getCommons(req.form);
    return response(res, data);
  }


  const createSupport = async (req, res) => {
    const data = await commons.createSupport(req.form);
    return response(res, data);
  }

  const getSupport = async (req, res) => {
    const data = await commons.getSupport(req.form);
    return response(res, data);
  }

  const deleteSupport = async (req, res) => {
    const data = await commons.deleteSupport(req.form);
    return response(res, data);
  }

  module.exports = {
    addCommons,
    getCommons,
    createSupport,
    getSupport,
    deleteSupport
  }
  