import React, { Component } from "react";
import SpringComponent from '../client/AboutComponent/Spring';


class About extends Component {
  constructor() {
    super();
    this.state={
      videPlaying:true,
    };
  }

  handleVideoEnd = () => {
    this.setState({videPlaying: false});
    setTimeout(function() {
      this.setState({videPlaying: true});
      this.refs.aboutVid.play();
    }.bind(this), 9000)
  }
  
  render() {
    return (
      <>
        {this.state.videPlaying &&
          <video ref="aboutVid" autoPlay muted class="about-video" onEnded={this.handleVideoEnd}>
            <source src="../../public/about_vid.mp4" type="video/mp4" />
          </video>
        }   
        {!this.state.videPlaying &&
          <SpringComponent/>
        }
      </>
    );
  } 
}


export default About;