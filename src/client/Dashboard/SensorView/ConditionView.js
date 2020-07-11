import React, { Component } from "react";
import ConditionDeleteButton from "./ConditionDeleteButton";

class ConditionView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { conditions } = this.props;
    return (
      <>
        {
          <ul>
            {Object.keys(conditions).map((index) => {
              let condition = conditions[index];
              let compare = "";
              switch (condition.comparison) {
                case 0:
                  compare = "= ";
                  break;
                case 1:
                  compare = "> ";
                  break;
                case 2:
                  compare = "< ";
                  break;
              }
              return (
                <li className="sensor-trigger-item" key={index}>
                  <div className="sensor-trigger-item-readings">
                    <span>{"Reading: " + compare + condition.sensorValue}</span>
                    <br></br>
                    <span>
                      {condition.isOn ? "Turn ON device:" : "Turn OFF device:"}
                    </span>
                    <br></br>
                    <span>{condition.device.name}</span>
                    <br></br>
                    <span>{"Value: " + condition.value}</span>
                  </div>
                  <ConditionDeleteButton conditionId={index} />
                </li>
              );
            })}
          </ul>
        }
      </>
    );
  }
}

export default ConditionView;
