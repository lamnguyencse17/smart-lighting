import { combineReducers } from "redux";
import user from "./user";
import area from "./area";
import device from "./device";

export default combineReducers({ user, area, device });
