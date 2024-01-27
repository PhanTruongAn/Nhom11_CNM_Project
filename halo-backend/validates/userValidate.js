import User from "../models/user";
const userValidate = {
  checkPass: (password) => {
    if (password.length < 1 || password.length > 10) {
      return {
        EM: "Mật khẩu phải từ 1-10 kí tự!",
      };
    }

    return {
      EC: 0,
    };
  },
  checkPhone: (phone) => {
    const regex = /^0[0-9]{9,10}$/;
    if (!regex.test(phone)) {
      return {
        EM: "Số điện thoại phải là số hợp lệ!",
      };
    }

    return {
      EC: 0,
    };
  },
  checkUsername: (username) => {
    if (username.length < 5 || username.length > 20) {
      return {
        EM: "Họ và tên phải từ 5-20 kí tự!",
      };
    }
    const regex = /^[a-zA-Z0-9_ ]+$/;
    if (!regex.test(username)) {
      return {
        EM: "Username chỉ được chứa chữ cái, số và dấu gạch dưới!",
      };
    }
    return {
      EC: 0,
    };
  },
  checkEmail: async (email) => {
    // Email dạng example@example.com
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return {
        EM: "Email không hợp lệ!",
      };
    }
    const exist = await User.findOne({ email: email }).exec();
    if (exist) {
      return {
        EM: "Email đã được sử dụng!",
      };
    }
    return {
      EC: 0,
    };
  },
};
module.exports = userValidate;
