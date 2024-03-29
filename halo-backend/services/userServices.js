// // User Registry
import User from "../models/user";
import bcrypt from "bcrypt";
import userValidate from "../validates/userValidate";
import jwtService from "../jwt/jwtServices";
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
// User Login
const userLogin = async (user) => {
  const account = await User.findOne({ phone: user.phone }).exec();
  if (!account) {
    return {
      EM: "Số điện thoại không tồn tại!",
    };
  }

  const comparePassword = bcrypt.compareSync(user.password, account.password);
  if (comparePassword) {
    let token = await jwtService.signToken(account.phone);
    return {
      EC: 0,
      DT: token,
    };
  } else {
    return {
      EM: "Mật khẩu không đúng!",
    };
  }
};
// SearchByPhone
const searchByPhone = async (user) => {
  const account = await User.findOne(
    { phone: user.phone },
    "name phone avatar email avatar sex dateOfBirth isActive"
  ).exec();
  if (!account) {
    return {
      EM: "Số điện thoại không tồn tại!",
    };
  }
  return {
    DT: account,
    EC: 0,
  };
};
// Update Information User
const updateUser = async (newData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: newData._id },
      {
        $set: {
          name: newData.name,
          sex: newData.sex,
          dateOfBirth: newData.dateOfBirth,
        },
      },
      {
        new: true,
        select:
          "_id name phone email avatar sex dateOfBirth isActive friendRequests sendFriendRequests friends",
      }
    );

    if (!updatedUser) {
      console.log("Không tìm thấy người dùng!");
      return null;
    }
    return {
      DT: updatedUser,
      EC: 0,
    };
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error);
    throw error;
  }
};
module.exports = {
  userRegistry,
  userLogin,
  searchByPhone,
  updateUser,
};
