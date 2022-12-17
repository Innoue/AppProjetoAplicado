import axios from "axios";

const api = axios.create({
  baseURL: "https://639ce30e16d1763ab1563dfe.mockapi.io/",
});

export default api;