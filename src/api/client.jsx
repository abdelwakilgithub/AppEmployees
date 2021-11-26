import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.11.102:8080",
});

export default apiClient;
