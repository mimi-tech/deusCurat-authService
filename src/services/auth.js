/* eslint-disable no-unreachable */
//const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const { constants } = require("../configs");
const { usersAccount } = require("../models");

/**
 * Display welcome text
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message
 */
const welcomeText = async () => {
  try {
    return {
      status: true,
      message: "welcome to Deus Curat app authentication service",
    };
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("WELCOME TEXT"),
    };
  }
};

/**
 * for creating account for a user account.
 * @param {Object} params email, password, username, profileImageUrl.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
 const deuscuratRegistration = async (params) => {
  
  try {
    const { email, password, phoneNumber,firstName,lastName,gender} = params;
     
    //check if  account is already registered
    const userAccount = await usersAccount.findOne({
      email: email,
    });

    if (userAccount) {
      return {
        status: false,
        message: "email already exist",
      };
    }

    //check if phone number is already registered
    const phoneNumberInUse = await usersAccount.findOne({
      phoneNumber: phoneNumber,
    });

    if (phoneNumberInUse) {
      return {
        status: false,
        message: "This phone number already exist",
      };
    }


    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create account
    const newUserAccount = await usersAccount.create({
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      firstName:firstName,
      lastName:lastName,
      gender:gender,  
    });
  
    
    //send emailCode to user email
    
    const publicData = {
      id: newUserAccount._id,
      email: newUserAccount.email,
      phoneNumber: newUserAccount.phoneNumber,
      firstName: newUserAccount.firstName,
      lastName: newUserAccount.lastName,
      gender: newUserAccount.gender,
    };

    return {
      status: true,
      message: "Account created successfully",
      data: publicData,
    };
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("CREATING ACCOUNT"),
    };
  }
};



  /**
 * login any in app user
 * @param {Object} params  contains email, password and accountTypes.
 * @returns {Promise<Object>} Contains status, and returns message
 */
const generalLogin = async (params) => {
  try {
    const { emailAddress, password, phoneNumber } = params;

    const userExist = await usersAccount.findOne(
      { $or: [{ email: emailAddress }, { phoneNumber:phoneNumber }] });

    if (!userExist) {
      return {
        status: false,
        message: "incorrect credentials!",
      };
    }

    //extract and store existing encrypted user password
    const existingUserPassword = userExist.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    //validate incoming user password with existing password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUserPassword
    );

    if (!isPasswordCorrect) {
      return {
        status: false,
        message: "incorrect credentials",
        
      };
    }

    const {
      email: _email,
      phone,
      _id,
      isActive,
      gender,
      firstName,
      lastName,
      contributionCount,
      requestCount
    } = userExist;

    const serializeUserDetails = {
     
      _email,
      phone,
      _id,
      isActive,
      gender,
      firstName,
      lastName,
      contributionCount,
      requestCount
    };
   
    const accessToken = jwt.sign(serializeUserDetails, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const publicData = {
      id: userExist._id,
      email: userExist.email,
      phoneNumber: userExist.phoneNumber,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      gender: userExist.gender,
      contributionCount: userExist.contributionCount,
      requestCount: userExist.requestCount,
    };
    return {
      status: true,
      message: "Login successful",
      token: accessToken,
      data: publicData,
    };
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("LOGIN"),
    };
  }}



/**
 * validates user token
 * @param {Object} params  contains email, password and roles.
 * @returns {Promise<Object>} Contains status, and returns message
 */
 const validateUserToken = async (params) => {
  try {
    const { token } = params;

    let loggedInUser;

    //verify jwt token
    const check = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return {
          status: false,
        };
      }

      loggedInUser = user;

      return {
        status: true,
      };
    });

    if (!check.status) {
      return {
        status: false,
        message: "Invalid Token",
      };
    }

    //fetch loggedinuser details
    const _user = await usersAccount.findOne({ email: loggedInUser._email });

    const {
      
      email,
      phoneNumber,
      _id,
      id,
      firstName,
      lastName,
      contributionCount,
      requestCount,
      isActive
    } = _user;

    const serializeUserDetails = {
      email,
      phoneNumber,
      _id,
      id,
      firstName,
      lastName,
      contributionCount,
      requestCount,
      isActive
    };

    return {
      status: true,
      message: "succes",
      data: serializeUserDetails,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("TOKEN VERIFICATION"),
    };
  }
};


/**
 * Update password endpoint
 * @param {Object} params email and password.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
const updatePassword = async (params) => {
  try {
    const { email, password } = params;
    const isEmailExisting = await usersAccount.findOne({
      email: email,
    });

    if (!isEmailExisting) {
      return {
        status: false,
        message: "Email not valid.",
      };
    }

    if (isEmailExisting.isActive !== true) {
      return {
        status: false,
        message: "Account is invalid.",
      };
    }

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //update password
    await usersAccount.updateOne(
      { email: email },
      {
        password: hashedPassword,
      }
    );

    return {
      status: true,
      message: "Password updated successfully. You may now login",
    };
  } catch (e) {
    return {
      status: false,
      message: constants.SERVER_ERROR("UPDATE PASSWORD VERIFICATION ENDPOINT"),
    };
  }
};

/**
 * update a user account
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message
 */
 const updateAccountData = async (params) => {
  try {
    const { authId, ...dataParams } = params;
    const accountToUpdate = await usersAccount.findOne({_id: authId});
    if (!accountToUpdate) {
      return {
        status: false,
        message: "Invalid user"
      }
    }
    accountToUpdate.gender = (dataParams.gender != undefined) ? dataParams.gender : accountToUpdate.gender;
    accountToUpdate.firstName = (dataParams.firstName != undefined) ? dataParams.firstName : accountToUpdate.firstName;
    accountToUpdate.lastName = (dataParams.lastName != undefined) ? dataParams.lastName : accountToUpdate.lastName;
    


    if(dataParams.updateEmail !== undefined){
      //check if email is already existing",

      const isEmailExisting = await usersAccount.findOne(
        { $and: [{ _id: accountToUpdate._id }, {  email: dataParams.updateEmail }] });
  
  
      if (!isEmailExisting) {
        const isEmailExisting = await usersAccount.findOne({email: dataParams.updateEmail})
        if(isEmailExisting){
          return {
            status: false,
            message: "Email is existing"
          }
        }
      }
      accountToUpdate.email =  dataParams.updateEmail;

    }

    accountToUpdate.email =  accountToUpdate.email;
    


    accountToUpdate.save()



    return {
      data:accountToUpdate,
      status: true,
      message: "Account updated successfully"
    }
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("UPDATE ACCOUNT DATA"),
    };
  }
}

 


module.exports = {
  welcomeText,
  deuscuratRegistration,
  generalLogin,
  validateUserToken,
  updatePassword,
  updateAccountData,
};


// {
//   "sourceLatitude": 5.5276,
//   "sourceLogitude": 7.0633,
//   "destinationLatitude": 5.79565,
//   "destinationLogitude": 7.03513,
//   "sourceAddress":"No 4b Amadi street Amakaohia",
//   "destinationAddress":"No 8a Oliver street Orji",
//   "driverId": "63029739eaa10e7942ff2dc5",
//   "driverInfo": {
//     "id": "63029739eaa10e7942ff2dc5",
//     "name": "Nnamdi John",
//     "profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTywiWn38XSbvbDg4LgTT9orTjYy_CoWV90ZA&usqp=CAU",
//     "phoneNumber": "23488378373",
//     "gender": "Male"
//   },
//   "sender": {
//     "id": "6303465b7645bc355b3eea5e",
//     "name": "Kelvin Jane",
//     "profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmZgywS7kBZLgz98cUMyFKSBLadef2gJxl9jNRXjI2pTguXCOHnVV9SIUgwp108plhtvQ&usqp=CAU",
//     "phoneNumber": "234808473473",
//     "gender": "Female",
//     "address": "Barcelona Spain"
//   },
//   "receiver": {
//     "name": "Monday",
//     "profilePicture": "Kenneth",
//     "phoneNumber": "234847834738",
//     "gender": "Male",
//     "address": "Barcelona Spain"
//   },
//   "item": {
//     "size": "16kg",
//     "number": 1,
//     "name": "mangoes"
//   },
//   "totalAmount": 76767,
//   "amount":8283,
//   "distance": 777,
//   "timeTaken": "8mins",
//   "country": "Nigeria",
//   "state": "Imo",
//   "methodOfPayment": "wallet",
//   "companyDetails": {
//     "id": "62ff5f4cc2b222f6cbfbdc47",
//     "name": "sureMove",
//     "owner": true
//   }
// }