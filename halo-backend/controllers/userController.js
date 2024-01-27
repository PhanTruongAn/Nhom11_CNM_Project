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
      EM: "Lỗi từ server",
      EC: -1,
      DT: [],
    });
  }
};
module.exports = {
  handlerRegistry,
};
