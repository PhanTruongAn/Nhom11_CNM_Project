require("dotenv").config();

const configSocket = (server) => {
  var clients = [];
  const URL = process.env.URL_CLIENT;
  const io = require("socket.io")(server, {
    cors: {
      origin: URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`${socket.id} user just connected!`);

    // socket.on("userLogin", (phone) => {
    //   console.log("Check userLogin", phone);
    // });
    socket.on("disconnect", () => {
      socket.disconnect();
      console.log(`${socket.id}  user disconnected`);
    });
  });
};
export default configSocket;
