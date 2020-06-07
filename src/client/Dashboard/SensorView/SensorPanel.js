import React, { Component } from 'react'

class SensorPanel extends Component {
    state = {
        latestReadings: "",
        history: [],
        triggerConditions : []
      }
    render (){
        return(
            <div className="sensor-content">
            <div className="sensor-row">
              <div className="sensor-column sensor-column-1">
                <div className="newest-readings">
                  <span className="newest-readings-title">Newest Readings</span><br></br>
                  <span className="newest-readings-content">100% (1024)</span><br></br>
                  <span className="newest-readings-date">last updated: 9:57AM</span>
                </div>
                <span className="sensor-hi  story-title">
                  HISTORIES
                </span>
                <div className="sensor-history-content">
                  <ul>
                    <li>
                      <span className="sensor-history-item-date">At 9:52 AM</span><br></br>
                      <span className="sensor-history-item-reading">100% (1024)</span>
                    </li>
                    <li>
                      <span className="sensor-history-item-date">At 12:00 AM</span><br></br>
                      <span className="sensor-history-item-reading">100% (1024)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="sensor-column sensor-column-2">
                <div className="sensor-graph">
                </div>
              </div>
              <div className="sensor-column sensor-column-3">
                <span className="sensor-trigger-title">TRIGGER CONDITIONS</span>
                <div className="sensor-trigger-content">
                  <ul>
                    <li className="sensor-trigger-item">
                    <span>Reading: 	&lt;20 </span><br></br>
                    <span>Turn on device:</span><br></br>
                    <span>Garage Light 1</span>
                    </li>
                    <li className="sensor-trigger-item">
                    <span>Reading: 	&gt;80 </span><br></br>
                    <span>Turn off device:</span><br></br>
                    <span>Garage Light 1</span>
                    </li>
                  </ul>
                  <button className="add-sensor-trigger">New Trigger</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default SensorPanel;