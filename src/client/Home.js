import React from "react";
import { Spring } from "react-spring/renderprops.cjs";

function MainPage(props) {
  let redirect = () => props.history.push("/dashboard");
  return (
    <>
      <div className="body">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 1000, duration: 3000 }}
        >
          {(props) => (
            <div style={props}>
              <div className="impressive-message">
                A NEW ERA OF SMART LIGHTING
                <br />
                START WITH US TODAY
                <br />
                <button onClick={redirect}>START NOW</button>
              </div>
            </div>
          )}
        </Spring>
      </div>
    </>
  );
}

export default MainPage;
