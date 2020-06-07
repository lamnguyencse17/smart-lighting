import React, { Component } from "react";

class SensorView extends Component {
  render() {
    return (
      <div class="sensor-view">
        <div class="sensor-view-content">
          <div class="row1">      
            <div class="bedroom-light">BEDROOM LIGHT 1</div>
            <div class="edit">EDIT</div>
          </div>
          <div class="sensor-content">
            <div class="sensor-row">
              <div class="sensor-column sensor-column-1">
                <div class="newest-readings">
                  <span class="newest-readings-title">Newest Readings</span><br></br>
                  <span class="newest-readings-content">100% (1024)</span><br></br>
                  <span class="newest-readings-date">last updated: 9:57AM</span>
                </div>
                <span class="sensor-history-title">
                  HISTORIES
                </span>
                <div class="sensor-history-content">
                  <ul>
                    <li>
                      <span class="sensor-history-item-date">At 9:52 AM</span><br></br>
                      <span class="sensor-history-item-reading">100% (1024)</span>
                    </li>
                    <li>
                      <span class="sensor-history-item-date">At 12:00 AM</span><br></br>
                      <span class="sensor-history-item-reading">100% (1024)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="sensor-column sensor-column-2">
                <div class="sensor-graph">

                </div>
              </div>
              <div class="sensor-column sensor-column-3">
                <span class="sensor-trigger-title">TRIGGER CONDITIONS</span>
                <div class="sensor-trigger-content">
                  <ul>
                    <li class="sensor-trigger-item">
                    <span>Reading: 	&lt;20 </span><br></br>
                    <span>Turn on device:</span><br></br>
                    <span>Garage Light 1</span>
                    </li>
                    <li class="sensor-trigger-item">
                    <span>Reading: 	&gt;80 </span><br></br>
                    <span>Turn off device:</span><br></br>
                    <span>Garage Light 1</span>
                    </li>
                  </ul>
                  <button class="add-sensor-trigger">New Trigger</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SensorView;
