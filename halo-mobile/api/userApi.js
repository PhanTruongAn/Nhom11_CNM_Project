import axiosClient from "./axiosClient";
import axios from "axios";
const userApi = {
  register: (userAccount) => {
    const url = "/registry";
    return axiosClient.post(url, userAccount);
  },
};
export default userApi;
