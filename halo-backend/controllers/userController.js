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
module.exports = {
  handlerRegistry,
  handleLogin,
};
