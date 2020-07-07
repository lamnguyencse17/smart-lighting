import { string } from "prop-types";

const timeConverter = (time) => {
  //TODO
  /*
  let atPre = time.split("T");
  let date = atPre[0].split("-");
  let hourZone=atPre[1].split("+");
  let hour =hourZone[0].split(":");
  let zone = hourZone[1].split(":");
  */
 let d= new Date(time);

  return "in "+(d.getTime()-Date.now())+" seconds";
};

export default timeConverter;
