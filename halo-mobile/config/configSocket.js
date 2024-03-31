import { REACT_APP_SOCKET_URL } from "../constants";
import { io } from "socket.io-client";
const socket = io.connect(REACT_APP_SOCKET_URL);
export default socket;
