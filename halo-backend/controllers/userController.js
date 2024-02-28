import userService from "../services/userServices";
// Handler Registry
const handlerRegistry = async (req, res) => {
  try {
    let data = await userService.userRegistry(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đăng ký không thành công",
      EC: -1,
      DT: [],
    });
  }
};

// Handler Login
const handleLogin = async (req, res) => {
  try {
    let data = await userService.userLogin(req.body);
    if (data && data.DT) {
      await res.cookie("Jwt", data.DT, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đăng nhập thất bại",
      EC: -1,
      DT: [],
    });
  }
};
const handlerLoginUser = async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      EM: "User information",
      EC: 0,
      DT: req.user,
    });
  } else {
    return res.status(500).json({
      EM: "Error from sever",
    });
  }
};
const handlerSearchByPhone = async (req, res) => {
  try {
    let data = await userService.searchByPhone(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  handlerRegistry,
  handleLogin,
  handlerLoginUser,
  handlerSearchByPhone,
};
