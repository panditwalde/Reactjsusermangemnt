import React, { Component } from "react";
import mi from "../../Images/mi-logo.jpg";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import loginbg from "../../Images/login-bg.jpg";
import Switch from "@material-ui/core/Switch";
import "../CssFiles/login.css";
import { login } from "./Service";
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#00a0f0",
        width: " -webkit-fill-available",
        paddingTop: "3%"
      }
    }
  }
});

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginDto: {}
    };
  }
  handleEmailChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handlePassowrdChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleLogin = () => {
    let loginDto = this.state.loginDto;
    loginDto.username = this.state.username;
    loginDto.password = this.state.password;
    login(loginDto)
      .then(Response => {
        localStorage.setItem("Token", Response.data.data);

        let userArray = Response.data.listOfAllUsers.filter(
          userData => userData.username === this.state.username
        );
        let activeUsers = Response.data.listOfAllUsers.filter(
          userData => userData.status === true
        ).length;
        let inActiveUsers = Response.data.listOfAllUsers.filter(
          userData => userData.status === false
        ).length;

        let user = userArray[0];
        let totalUsers = Response.data.listOfAllUsers.length;
        let onlineUsersData = Response.data.additionalData;
        let loginHistory = Response.data.loginHistory;
        this.props.history.push({
          pathname: "/dashboard",
          state: {
            user: user,
            onlineUsersData: onlineUsersData,
            totalUsers: totalUsers,
            activeUsers: activeUsers,
            inActiveUsers: inActiveUsers,
            loginHistory: loginHistory,
            listOfAllUsers:Response.data.listOfAllUsers
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "12%"
        }}
      >
        <div className="login">
          <div className="mi">
            <img src={mi} width="80%" height="40%" alt="mi"></img>
          </div>
          <div style={{ opacity: "0.3" }}>Login to your account</div>
          <TextField
            label="username"
            margin="dense"
            size="small"
            name="email"
            id="outlined"
            variant="outlined"
            onChange={this.handleEmailChange}
          />

          <TextField
            size="small"
            id="outlined-adornment-password"
            variant="outlined"
            name="password"
            type={this.state.showPassword ? "text" : "password"}
            label="password"
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sytle={{ width: "1px" }}
                ></InputAdornment>
              )
            }}
            onChange={this.handlePassowrdChange}
          />
          <div style={{ paddingBottom: "3%", paddingTop: "3%" }}>
            <Switch value="checkedC" color="primary" />
            <b style={{ color: " #a0aeba" }}> Remember Me</b>
          </div>
          <div>
            <MuiThemeProvider theme={theme}>
              <Button variant="contained" onClick={this.handleLogin}>
                login
              </Button>
            </MuiThemeProvider>
          </div>

          <a style={{ paddingTop: "10%", color: "#00aaff" }} href="">
            Forgot password?
          </a>
        </div>

        <img
          src={loginbg}
          width="38%"
          alt="mi"
          style={{ opacity: "0.4" }}
        ></img>
      </div>
    );
  }
}

export default Login;
