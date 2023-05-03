const { testimony } = require("../services");
const { response } = require("../helpers");

const createTestimony = async (req, res) => {
  const data = await testimony.createTestimony(req.form);
  return response(res, data);
}

const getTestimony = async (req, res) => {
    const data = await testimony.getTestimony(req.form);
    return response(res, data);
  }


  const deleteTestimony = async (req, res) => {
    const data = await testimony.deleteTestimony(req.form);
    return response(res, data);
  }

  const getATestimony = async (req, res) => {
    const data = await testimony.getATestimony(req.form);
    return response(res, data);
  }

  module.exports = {
    createTestimony,
    getTestimony,
    deleteTestimony,
    getATestimony
  }
  