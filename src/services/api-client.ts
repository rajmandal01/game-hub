import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "5de2bf227b1b4a0caa8877934cbc6a73",
  },
});
