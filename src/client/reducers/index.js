import { combineReducers } from "redux";
import user from "./user";
import area from "./area";
import device from "./device";
import sensor from "./sensor";
import error from "./error";

export default combineReducers({ user, area, device, sensor, error });
