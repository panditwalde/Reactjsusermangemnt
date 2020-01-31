import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getUserList } from "./Service";
import "../CssFiles/gender.css";
import { Paper } from "@material-ui/core";
const styles = {
  root: {
    flexGrow: 1
  }
};
const OverRidedLinearProgress = withStyles({
  root: {
    height: "5px"
  },
  barColorSecondary: {
    backgroundColor: "#43bda1"
  },
  colorSecondary: {
    backgroundColor: "#a1dcd4"
  }
})(LinearProgress);

class LinearDeterminate extends React.Component {
  state = {
    completed: 0,
    maleArray: [],
    femaleArray: [],
    numMaleUsers: "",
    numFemaleUsers: "",
    totalUsers: "",
    malePercentage: "",
    femalePercentage: ""
  };

  componentDidMount() {
    let token = localStorage.getItem("Token");
    getUserList(token).then(Response => {
      let maleArray = Response.data.data.filter(
        user => user.gender.length === 4
      );
      let femaleArray = Response.data.data.filter(
        femaleUser => femaleUser.gender === "female"
      );

      let numMaleUsers = maleArray.length;
      let numFemaleUsers = femaleArray.length;
      let totalUsers = Response.data.data.length;

      let malePercentage = ((100 * numMaleUsers) / totalUsers).toFixed(2);
      let femalePercentage = ((100 * numFemaleUsers) / totalUsers).toFixed(2);
      this.setState({
        maleArray: maleArray,
        femaleArray: femaleArray,
        numMaleUsers: numMaleUsers,
        numFemaleUsers: numFemaleUsers,
        totalUsers: totalUsers,
        malePercentage: malePercentage,
        femalePercentage: femalePercentage
      });
    });
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    return (
      <div className="main">
        <div className="gender">Gender</div>
        <div>
          <div>
            <div className="ageAndPercentage">
              <div>Male</div>
              <div>{this.state.malePercentage}%</div>
            </div>
            <OverRidedLinearProgress
              color="secondary"
              variant="determinate"
              value={this.state.malePercentage}
            />
          </div>
          <div>
            <div className="ageAndPercentage">
              <div>Female</div>
              <div>{this.state.femalePercentage}%</div>
            </div>
            <OverRidedLinearProgress
              color="secondary"
              variant="determinate"
              value={this.state.femalePercentage}
            />
          </div>
        </div>
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinearDeterminate);
