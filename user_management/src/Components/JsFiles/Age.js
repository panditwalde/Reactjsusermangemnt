import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getUserList } from "./Service";
import "../CssFiles/age.css";
import { Tooltip, Paper } from "@material-ui/core";
const styles = {
  root: {
    flexGrow: 1
  }
};
const OverRidedLinearProgress = withStyles({
  root: {
    height: "12px"
  },
  barColorSecondary: {
    backgroundColor: "#f3b50685"
  },
  colorSecondary: {
    backgroundColor: "white"
  }
})(LinearProgress);
class LinearDeterminate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      ageArray_18_22: [],
      ageArray_23_27: [],
      ageArray_28_32: [],
      ageArray_33_37: [],
      ageArray_38_42: [],
      ageArray_over_42: [],
      ageArray_under_18: [],
      age_18_22: "",
      age_23_27: "",
      age_28_32: "",
      age_33_37: "",
      age_38_42: "",
      age_over_42: "",
      age_under_18: "",
      totalNumberOfUsers: ""
    };
  }

  getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);

    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    if (age < 18) {
      var temp = this.state.ageArray_under_18;
      temp.push(age);
      this.setState({
        ageArray_under_18: temp
      });
    }

    if (18 < age && age < 23) {
      this.setState({
        ageArray_18_22: this.state.ageArray_18_22.push(age)
      });
    }

    if (22 < age && age < 28) {
      let temp = this.state.ageArray_23_27;
      temp.push(age);
      this.setState({
        ageArray_23_27: temp
      });
    }

    if (27 < age && age < 33) {
      this.setState({
        ageArray_28_32: this.state.ageArray_23_27.push(age)
      });
    }

    if (32 < age && age < 38) {
      this.setState({
        ageArray_33_37: this.state.ageArray_33_37.push(age)
      });
    }

    if (37 < age && age < 43) {
      this.setState({
        ageArray_38_42: this.state.ageArray_38_42.push(age)
      });
    }

    if (42 < age) {
      let array = this.state.ageArray_over_42;
      array.push(age);
      this.setState({
        ageArray_over_42: array
      });
    }
    return age;
  }

  calculateAgePercentage = () => {
    let age_18_22 =
      (this.state.ageArray_18_22.length / this.state.totalNumberOfUsers) * 100;
    console.log(age_18_22);

    let age_23_27 =
      (this.state.ageArray_23_27.length / this.state.totalNumberOfUsers) * 100;
    let age_28_32 =
      (this.state.ageArray_28_32.length / this.state.totalNumberOfUsers) * 100;
    let age_33_37 =
      (this.state.ageArray_33_37.length / this.state.totalNumberOfUsers) * 100;
    let age_38_42 =
      (this.state.ageArray_38_42.length / this.state.totalNumberOfUsers) * 100;
    let age_over_42 =
      (this.state.ageArray_over_42.length / this.state.totalNumberOfUsers) *
      100;
    let age_under_18 =
      (this.state.ageArray_under_18.length / this.state.totalNumberOfUsers) *
      100;

    this.setState({
      age_18_22: age_18_22,
      age_23_27: age_23_27,
      age_28_32: age_28_32,
      age_33_37: age_33_37,
      age_38_42: age_38_42,
      age_over_42: age_over_42,
      age_under_18: age_under_18
    });
  };
  componentDidMount() {
    let token = localStorage.getItem("Token");
    getUserList(token).then(Response => {
      Response.data.data.map(user => this.getAge(user.dateOfBirth));
      this.setState(
        {
          totalNumberOfUsers: Response.data.data.length
        },
        () => {
          this.calculateAgePercentage();
        }
      );
    });
  }

  render() {
    return (
      <div className="main">
        <div className="ageGroup">Age group</div>
        {this.state.age_under_18 !== 0 ? (
          <div className="ageAndPercentage">
            <div>under 18</div>
            <Tooltip title={"Users : " + this.state.ageArray_under_18.length}>
              <div className="progressBar">
                <OverRidedLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.age_under_18}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}

        {this.state.age_18_22 !== 0 ? (
          <div className="ageAndPercentage">
            <div>18-22</div>
            <Tooltip title={"Users : " + this.state.ageArray_18_22.length}>
              <div className="progressBar">
                <OverRidedLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.age_18_22}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}

        {this.state.age_23_27 !== 0 ? (
          <div className="ageAndPercentage">
            <div>23-27</div>
            <Tooltip title={"Users : " + this.state.ageArray_23_27.length}>
              <div className="progressBar">
                <OverRidedLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.age_23_27}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}

        {this.state.age_28_32 !== 0 ? (
          <div className="ageAndPercentage">
            <div>28-32</div>
            <Tooltip title={"Users : " + this.state.ageArray_28_32.length}>
              <div className="progressBar">
                <OverRidedLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.age_28_32}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}

        {this.state.age_33_37 !== 0 ? (
          <div className="ageAndPercentage">
            <div>33-37</div>
            <Tooltip title={"Users : " + this.state.ageArray_33_37.length}>
              <div className="progressBar">
                <OverRidedLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.age_33_37}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}

        {this.state.age_38_42 !== 0 ? (
          <div className="ageAndPercentage">
            <div>38-42</div>
            <Tooltip title={"Users : " + this.state.ageArray_38_42.length}>
              <div className="progressBar">
                <OverRidedLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.age_38_42}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}

        {this.state.age_over_42 !== 0 ? (
          <div className="ageAndPercentage">
            <div>over 42</div>
            <Tooltip title={"Users : " + this.state.ageArray_over_42.length}>
              <div className="progressBar">
                <OverRidedLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={this.state.age_over_42}
                />
              </div>
            </Tooltip>
          </div>
        ) : null}
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinearDeterminate);
