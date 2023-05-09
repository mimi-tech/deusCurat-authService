const jwt = require("jsonwebtoken");
const { response } = require("../helpers");
const { auth } = require("../services");

//creates a list of non restricted endpoints
const nonRestrictedEndPoints = [
  "/",
  "/create-account",
  "/login",
  "/validate-user-token",
  "/update-password",
  "/get-commons",
];


const restricted = [
  "/update-account-data",
  "/delete-account",
  "/account-status",
  "/get-all-users",
  "/get-a-user",
  "/search-user",
  "/add-commons",
  "/create-support",
  "/get-support",
  "/delete-support",
  "/create-needy-account",
  "/get-all-needy",
  "/get-a-needy-account",
  "/delete-a-needy-account",
  "/update-a-needy-account",
  "/update-a-needy-account-count",
  "/update-a-needy-account-status",
  "/create-testimony",
  "/get-testimony",
  "/delete-testimony",
  "/get-a-testimony",
  "/add-payment",
  "/get-payment",
  "/delete-payment",
  "/update-payment",

];
const inServiceEndPoints = ["/get-church-user-in-app"];

module.exports = async (req, res, next) => {
  //forwards request without validation if is not restricted
  if (nonRestrictedEndPoints.includes(req.path)) {
    next();
  } else if (inServiceEndPoints.includes(req.path)) {
    jwt.sign({}, process.env.SECRET);
    try {
      jwt.verify(req.headers["x-access-token"], process.env.SECRET);
    } catch (error) {
      console.log(error);
      return response(
        res,
        { status: false, message: "Unauthorized Access!  " },
        401
      );
    }
    next();
  } else {
    //validates request if is restricted
    const token = req.headers.authorization;
    
    const body = { token: token };
    const data = await auth.validateUserToken(body);
    if (data.status === false) {
      return response(
        res,
        { status: false, message: "Unauthorized Access" },
        401
      );
    }
    req.authData = data.data;
    next();
  }
};
