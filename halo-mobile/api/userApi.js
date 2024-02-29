import axiosClient from "./axiosClient";
import axios from "axios";
const userApi = {
  register: (userAccount) => {
    const url = "/registry";
    return axiosClient.post(url, userAccount);
  },
  login: (userAccount) => {
    const url = "/login";
    return axiosClient.post(url, userAccount);
  },
  loginUser: () => {
    const url = "/login-user";
    return axiosClient.get(url);
  },
  searchByPhone: (user) => {
    const url = "/searchByPhone";
    return axiosClient.post(url, user);
  },
  updateUser: (user) => {
    const url = "/update-user";
    return axiosClient.post(url, user);
  },
};
export default userApi;
