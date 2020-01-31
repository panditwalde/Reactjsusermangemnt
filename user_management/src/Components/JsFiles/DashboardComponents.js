import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "../CssFiles/dashboard.css";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Avatar, Paper, Divider } from "@material-ui/core";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import moment from "moment";
import Age from "../JsFiles/Age";
import Gender from "./Gender";
import LatestUsers from "./LatestUsers";
import Buttons from "./Buttons";
import Location from "./Location";
import Chart from "./Chart";
import { getUser, getUserList } from "./Service";

const OverRidedAvatar = withStyles({
  root: {
    height: 50,
    width: 50
  }
})(Avatar);
export class DashboardComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      isUser: false,
      isWebpage: false,
      user: {},
      onlineUsersData: {},
      totalUsers: "",
      activeUsers: "",
      inActiveUsers: "",
      loginHistory: "",
      listOfAllUsers: []
    };
  }

  getData = () => {
    let token = localStorage.getItem("Token");
    getUser(token)
      .then(Response => {
        let user = Response.data.data;
        this.setState({
          user: user
        });
      })
      .catch(err => {
        console.log(err);
      });

    getUserList(token).then(Response => {
      let userArray = Response.data.data.filter(
        userData => userData.username === this.state.username
      );
      let activeUsers = Response.data.data.filter(
        userData => userData.status === true
      ).length;
      let inActiveUsers = Response.data.data.filter(
        userData => userData.status === false
      ).length;

      let totalUsers = Response.data.data.length;
      let onlineUsersData = Response.data.listOfAllUsers;
      let loginHistory = Response.data.additionalData;

      let loginHistoryArraySize = loginHistory.length;
      let lastLogin = moment(loginHistory[loginHistoryArraySize - 2]).format(
        "MMM D YYYY, hh:mm A"
      );
      this.setState({
        listOfAllUsers: Response.data.data,
        onlineUsersData: onlineUsersData,
        totalUsers: totalUsers,
        activeUsers: activeUsers,
        inActiveUsers: inActiveUsers,
        loginHistory: lastLogin,
        listOfAllUsers: Response.data.listOfAllUsers
      });
    });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        <Paper className="profilePaper">
          <div>
            <Typography className="welcome">
              Welcome {this.state.user.firstName} {this.state.user.middleName}{" "}
              {this.state.user.lastName}
            </Typography>

            <Typography className="logoutTime">
              You last logged in on: {this.state.loginHistory}
            </Typography>
          </div>
          <div className="homeIconAndButton">
            <HomeTwoToneIcon className="homeIcon" />
            <Typography className="home">Home</Typography>
            <Typography>/dashboard</Typography>
          </div>
        </Paper>
        <div className="userInformation">
          <Paper className="total">
            <OverRidedAvatar style={{ backgroundColor: "rgb(9, 172, 236)" }}>
              <PersonOutlineIcon fontSize="default" />
            </OverRidedAvatar>
            <div className="totalAndTotalCount">
              <div className="countName">TOTAL</div>
              <div className="count">{this.state.totalUsers}</div>
            </div>
          </Paper>
          <Paper className="total">
            <OverRidedAvatar style={{ backgroundColor: "rgb(9, 172, 236)" }}>
              <PersonOutlineIcon fontSize="default" />
            </OverRidedAvatar>
            <div className="totalAndTotalCount">
              <div className="countName">ACTIVE</div>
              <div className="count">{this.state.activeUsers}</div>
            </div>
          </Paper>
          <Paper className="total">
            <OverRidedAvatar style={{ backgroundColor: "rgb(9, 172, 236)" }}>
              <PersonOutlineIcon fontSize="default" />
            </OverRidedAvatar>
            <div className="totalAndTotalCount">
              <div className="countName">INACTIVE</div>
              <div className="count">{this.state.inActiveUsers}</div>
            </div>
          </Paper>
          <Paper className="total">
            <OverRidedAvatar style={{ backgroundColor: "rgb(9, 172, 236)" }}>
              <PersonOutlineIcon fontSize="default" />
            </OverRidedAvatar>
            <div className="totalAndTotalCount">
              <div className="countName">ONLINE</div>
              <div className="count">
                {this.state.onlineUsersData.userCount}
              </div>
            </div>
          </Paper>
        </div>
        <div className="graphAndProfile">
          <Paper className="graphAndAllMain">
            <div className="allRegistration">All Time Registration history</div>
            <Divider />
            <div className="graphAndLocation">
              <div className="graph">
                <Buttons />
                <div>
                  <Chart />
                </div>
              </div>
              <div className="verticalLine"></div>
              <div className="ageGenderLocation">
                <Location
                  handleTopLocationClick={this.props.handleTopLocationClick}
                />
                <Age listOfAllUsers={this.state.listOfAllUsers} />
                <Gender listOfAllUsers={this.state.listOfAllUsers} />
              </div>
            </div>
          </Paper>
          <LatestUsers />
        </div>
      </div>
    );
  }
}

export default DashboardComponents;
