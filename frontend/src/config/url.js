import axios from "axios";

export const API = axios.create({
  baseURL: "https://rabbitecom-sigma.vercel.app",
});
