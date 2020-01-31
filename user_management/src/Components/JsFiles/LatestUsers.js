import React, { Component } from "react";
import { Paper, Divider } from "@material-ui/core";
import { getUserList } from "./Service";
import ProfileAvatar from "./ProfileAvatar";
import "../CssFiles/latestUsers.css";
import moment from "moment";

export class LatestUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userArray: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("Token");
    getUserList(token).then(Response => {
      this.setState({
        userArray: Response.data.data
      });
    });
  }

  render() {
    return (
      <Paper className="latestUsersMain">
        <div className="allRegistration">Latest Registration</div>
        <Divider />
        <div className="allUsers">
          {this.state.userArray !== null && this.state.userArray !== undefined
            ? this.state.userArray.map(user => (
                <div className="eachUser">
                  <div className="latestUserAvatar">
                    <ProfileAvatar user={user} />
                  </div>

                  <div className="latestUserInfo">
                    <div className="fnameAndLname">
                      {user.firstName} {user.middleName} {user.lastName}
                    </div>

                    {moment(user.createdDate).format("MMM D YYYY, hh:mm A")}
                  </div>
                </div>
              ))
            : null}
        </div>
      </Paper>
    );
  }
}

export default LatestUsers;
