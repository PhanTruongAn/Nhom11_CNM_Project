import jwtService from "../jwt/jwtServices";
import User from "../models/user";

export const checkCookie = async (req, res, next) => {
  let token = req.cookies;
  if (token && token.Jwt) {
    let decoded = jwtService.generateToken(token.Jwt);
    if (decoded && decoded.data) {
      let user = await User.findOne(
        { phone: decoded.data },
        "_id name phone email isActive friendRequests sendFriendRequests friends"
      ).exec();
      if (user) {
        req.user = {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          isActive: user.isActive,
          friendRequests: user.friendRequests,
          sendFriendRequests: user.sendFriendRequests,
          friends: user.friends,
        };
        next();
      }
    } else {
      return res.status(403).json({
        EM: "Error Authentication",
      });
    }
  } else {
    return res.status(403).json({
      EM: "Error from Server",
    });
  }
};
