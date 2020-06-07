import { combineReducers } from "redux";
import user from "./user";
import area from "./area";
import device from "./device";
import sensor from "./sensor";

export default combineReducers({ user, area, device, sensor });
