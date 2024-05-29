import axios from "axios";
import { Location } from "../types/locationTypes";

export const deleteLocation = (location: String, place: String) => {
  return axios.delete(
    `http://localhost:3000/api/locations?location=${location}&&name=${place}`
  );
};

export const getLocation = (searchLocation: String) => {
  return axios.get<Location>(
    `http://localhost:3000/api/locations?location=${searchLocation}`
  );
};
