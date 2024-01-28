// // User Registry
import User from "../models/user";
import bcrypt from "bcrypt";
import userValidate from "../validates/userValidate";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const userRegistry = async (user) => {
  const nameCheck = userValidate.checkUsername(user.name);
  if (nameCheck.EC !== 0) {
    return nameCheck;
  }
  const phoneCheck = await userValidate.checkPhone(user.phone);
  if (phoneCheck.EC !== 0) {
    return phoneCheck;
  }
  const emailCheck = userValidate.checkEmail(user.email);
  if (emailCheck.EC !== 0) {
    return emailCheck;
  }
  const passCheck = userValidate.checkPass(user.password);
  if (passCheck.EC !== 0) {
    return passCheck;
  }

  let password = hashPassword(user.password);
  const newUser = new User({ ...user, password });
  await newUser.save();
  return {
    EC: 0,
  };
};
module.exports = {
  userRegistry,
};
