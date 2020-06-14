import React, { Component } from "react";;
import { Spring } from "react-spring/renderprops.cjs";

export default class SpringComponent extends Component {
  constructor() {
    super();
    this.state={
      reverseAni:false,
    };
  }

  handleAnimationEnd = () =>{
    this.setState({reverseAni: !this.state.reverseAni})
  }
  componentDidMount() {
    this.startInterval();
  }

  startInterval() {
    this.interval = setInterval(this.handleAnimationEnd, 4500);
  }
  render() {
    return (
      <>
          <Spring
            from={{ opacity:  0 }}
            to={{ opacity: 1}}
            reverse={this.state.reverseAni}
            reset={true}
            native={false}
            onRest={()=>this.handleAnimationEnd}
            config={{duration: 4000, delay: 500}}
          >
            {(props) => (
              <div style={props}>
                <div class="about-animation">
                  SMART LIGHTING
                  <br />
                    YOUR HOUSE, IN YOUR HANDS
                  <br />
                </div>
              </div>
              
            )}
          </Spring>
      </>
    );
  }
}
