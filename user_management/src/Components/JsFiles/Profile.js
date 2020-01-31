import React, { Component } from "react";
import profile from "../../Images/profilebg.jpg";
import "../CssFiles/Profile.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Profile2 from "../JsFiles/Profile2";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { getUser } from "./Service";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#00a0f0",
        paddingTop: "8px",
        width: "135px"
      }
    }
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {} };
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
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="mainForProfile">
        <div className="profilemain">
          <div>
            <div
              className="profilestyle"
              style={{
                backgroundImage: "url(" + profile + ")",
                backgroundPosition: "center",
                height: "260px",
                width: "351px"
              }}
            >
              <b style={{ color: "white" }}> dddfff</b>
            </div>
            <div style={{ opacity: ".6", padding: "10px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "large",
                  paddingTop: "8px"
                }}
              >
                {" "}
                <b>Basic Info</b>
              </div>
              <div
                style={{
                  display: "flex",
                  paddingTop: "8px",
                  justifyContent: "space-between"
                }}
              >
                <b>Email</b>
                {this.state.user.email}
              </div>
              <div
                style={{
                  display: "flex",
                  paddingTop: "8px",
                  justifyContent: "space-between"
                }}
              >
                <b> Username</b>
                {this.state.user.username}
              </div>
            </div>

            <div style={{ paddingBottom: " 34px" }}>
              {" "}
              <MuiThemeProvider theme={theme}>
                {" "}
                <Button
                  // onClick={this.props.handleEditDetailsClick()}
                  variant="contained"
                  color="primary"
                >
                  Edit profile
                </Button>
              </MuiThemeProvider>
            </div>
          </div>
        </div>
        <div style={{ paddingeft: "5%", width: "60%" }}>
          <Profile2 user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default Profile;
