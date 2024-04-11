import PrivateMessenger from "../models/privateMessenger";
import User from "../models/user";
const sendMessage = async (user) => {
  try {
    let sender = await User.findOne({ phone: user.sender }).exec();
    let receiver = await User.findOne({
      phone: user.receiver,
    }).exec();
    if (sender && receiver && user.text) {
      const chat = new PrivateMessenger({
        sender: sender,
        receiver: receiver,
        text: user.text,
      });
      const chatData = await chat.save();
      return {
        EM: "Send messenger is success!",
        EC: 0,
        DT: chatData,
      };
    } else {
      return {
        EM: "Send messenger is error!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("server " + error);
    return {
      EM: "something wrong from server",
      EC: 1,
      DT: [],
    };
  }
};
const getAllChatPrivate = async (data) => {
  try {
    let sender = await User.findOne({ phone: data.sender }).exec();
    let receiver = await User.findOne({
      phone: data.receiver,
    }).exec();
    if (sender && receiver) {
      const totalDocuments = await PrivateMessenger.countDocuments({
        $or: [
          { sender: sender._id, receiver: receiver._id },
          { sender: receiver._id, receiver: sender._id },
        ],
      });
      const remainingDocuments = Math.max(0, totalDocuments - data.skip);
      const limit = Math.min(6, remainingDocuments);

      let test = await PrivateMessenger.find({
        $or: [
          { sender: sender._id, receiver: receiver._id },
          { sender: receiver._id, receiver: sender._id },
        ],
      })
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(data.skip)
        .exec();
      const reversedGroup = test.reverse();
      return {
        EM: "Get all messenger is success!",
        EC: 0,
        DT: reversedGroup,
      };
    } else {
      return {
        EM: "get all messange is error!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("server " + error);
    return {
      EM: "something wrong from server",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  sendMessage,
  getAllChatPrivate,
};
