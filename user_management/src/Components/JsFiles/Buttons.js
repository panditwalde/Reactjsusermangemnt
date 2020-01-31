import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "../CssFiles/dashboard.css"

const OverRidedButton = withStyles({
  root: {
    fontSize: "11px",
    padding: "4px 16px"
  },
  containedPrimary: {
    backgroundColor: "rgb(9, 172, 236)"
  }
})(Button);
export class Buttons extends Component {
  render() {
    return (
      <div className="buttonsDiv">
        <OverRidedButton variant="contained" color="primary" style={{marginRight:4}}>
          All Time
        </OverRidedButton>
        <OverRidedButton variant="contained" color="primary" style={{marginRight:4}}>
          2020
        </OverRidedButton>
        <OverRidedButton variant="contained" color="primary">
          January
        </OverRidedButton>
      </div>
    );
  }
}

export default Buttons;
