import axios from "axios";
import IEvent from "../types/IEvent";

// Connect to json-server locally (default localhost and port 3000)
const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    return apiClient.get("/events");
  },
  getEvent(id: number) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event: IEvent) {
    return apiClient.post("/events", event);
  },
};
