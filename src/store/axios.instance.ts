import axios from "axios";

const $axios = axios.create({
  baseURL: "https://bereklub.herokuapp.com/",
  withCredentials: true,
});

export default $axios;
