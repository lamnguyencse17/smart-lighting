import React, { Component } from "react";

class ConditionView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {conditions} =this.props;
    
    return <>{/* TODO */
        <ul>
          {Object.keys(conditions).map((index) => {
            let condition = conditions[index];
            let compare ="";
            switch(condition.comparison){
              case 0:
                compare = "= ";
                break;
              case 1:
                compare = "> ";
                break;
              case 2:
                compare = "< ";
                break;
            };
            return(
              <li className ="Condition-item" keys ={index}>
                <span>{"Reading "+compare+condition.sensorValue}</span>
                <br></br>
                <span>{condition.isOn? "Turn ON device:":"Turn OFF device:"}</span>
                <br></br>
                <span>{condition.device.name}</span>
                <br></br>
                <span>{"Value: "+condition.value }</span>

              </li>
            );
          })}
        </ul>
    }</>;
  }
}

export default ConditionView;
