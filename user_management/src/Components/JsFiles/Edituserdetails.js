import React, { Component } from "react";
import "../CssFiles/Userregistration.css";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Checkbox from "@material-ui/core/Checkbox";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { getUser } from "./Service";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#00a0f0",
        paddingTop: "3%",
        width: "135px",
        marginLeft: "-55%"
      }
    }
  }
});
const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});
export class Userregistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: "--Select--",
      name: "hai",
      labelWidth: 0,
      list: ["web page", "dashboard", "Settings", "Users Information"],

      userdata:this.props.location.state.user,
      firstname: "",
      middlename: "",
      lastname: "",
      selectedDate: new Date(),
      gender: "",
      country: "",
      phone: "",
      phoneEx: "",
      email: "",
      address: "",
      username: "",
      password: "",
      cfmpassword: "",
      userrole: "",
      file: "",
      add: false,
      delete: false,
      modify: false,
      read: false
    };
  }

  handleConfirmPasswordChange = name => event => {
    console.log(event.target.value);
    this.setState({ cfmpassword: event.target.value });
  };
  handleDateChange = date => {
    console.log("date", date);

    this.setState({ selectedDate: date });
  };

  handleUserRoleChange = name => event => {
    console.log(event.target.value);

    this.setState({ userrole: event.target.value });
  };

  handleCountryChange = name => event => {
    this.setState({ country: event.target.value });
  };

  handleAgeChange = name => event => {
    console.log(event.target.value);

    this.setState({ age: event.target.value });
  };

  handleCountryChange = name => event => {
    console.log(event.target.value);

    this.setState({ country: event.target.value });
  };
  handleFirstNameChange = event => {
    this.setState({ firstname: event.target.value });
  };
  handleMiddleNameChange = event => {
    this.setState({ middlename: event.target.value });
  };

  handleLastNameChange = event => {
    this.setState({ lastname: event.target.value });
  };
  handleAddressChange = event => {
    this.setState({ address: event.target.value });
  };
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handlePassowrdChange = event => {
    this.setState({ password: event.target.value });
  };
  handlecfrmpasswordChange = event => {
    this.setState({ cfmpassword: event.target.value });
  };
  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };
  handlePhoneExChange = event => {
    this.setState({ phoneEx: event.target.value });
  };
  handleUserRoleChange = name => event => {
    console.log(event.target.value);

    this.setState({ userrole: event.target.value });
  };

  handleFileChange = e => {
    const formData = new FormData();

    formData.append("file", e.target.files[0], e.target.files[0].name);

    // addProfileTmp(formData)
    //   .then(response => {
    //     this.setState({ file: response.data.data });
    //   })
    //   .catch(err => {
    //     console.log("error");
    //   });
  };

  HandleAddchnage = () => {
    this.setState({ add: !this.state.add });
  };

  HandleDeletechnage = () => {
    this.setState({ delete: !this.state.delete });
  };

  HandleModifychnage = () => {
    this.setState({ modify: !this.state.modify });
  };
  HandleReadchnage = () => {
    this.setState({ read: !this.state.read });
  };

  handleUpdateUserChange = () => {
    if (this.state.password === this.state.cfmpassword) {
      let user = {};
      user.firstName = this.state.firstname;
      user.middleName = this.state.middlename;
      user.lastname = this.state.lastname;
      user.lastname = this.state.selectedDate;
      user.gender = this.state.gender;
      user.country = this.state.country;
      user.phoneNumber = this.state.phone;
      user.phoneEx = this.state.phoneEx;
      user.email = this.state.email;
      user.address = this.state.address;
      user.username = this.state.username;
      user.password = this.state.password;
      user.userRole = this.state.userrole;
    }
  };
  // getData = () => {
  //   let token = localStorage.getItem("Token");
  //   getUser(token)
  //     .then(Response => {
  //       let user = Response.data.data;
  //       // this.setState(
  //       //   {
  //       //     userdata: user
  //       //   },
  //       //   () => {
  //       //     console.log(this.state.userdata.firstName);
  //       //   }
  //       // );
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // componentDidMount() {
  //   this.getData();
  // }
  render() {
    console.log(this.state.userdata);

    const { classes } = this.props;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "33px",
          flexDirection: "column",
          padding: "3%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div className="general">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "3%",
                color: " #a0aeba"
              }}
            >
              General
            </div>

            <div className="name">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  classname="spancardscss"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "3px",
                    color: " #a0aeba"
                  }}
                >
                
                  First Name
                </span>
                <TextField
                  margin="dense"
                  size="small"
                  name="firstname"
                  defaultValue={this.state.userdata.firstName}
                  required
                  id="outlined"
                  variant="outlined"
                  style={{ width: "85%" }}
                  onChange={this.handleFirstNameChange}
                />
              </div>
              <div classname="firstname">
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  {" "}
                  Middle Name{" "}
                </span>

                <TextField
                  margin="dense"
                  size="small"
                  name="middlename"
                  defaultValue={this.state.userdata.middleName}
                  required
                  id="outlined"
                  variant="outlined"
                  style={{ width: "85%" }}
                  onChange={this.handleMiddleNameChange}
                />
              </div>
              <div classname="firstname">
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                
                  Last Name
                </span>

                <TextField
                  margin="dense"
                  size="small"
                  name="lastname"
                  required
                  defaultValue={this.state.userdata.lastName}
                  id="outlined"
                  variant="outlined"
                  style={{ width: "85%" }}
                  onChange={this.handleLastNameChange}
                />
              </div>
            </div>

            <div style={{ display: "flex", padding: "2%" }}>
              <div>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  Date of Birth
                </span>
                <FormControl variant="outlined" className={classes.formControl}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      margin="dense"
                      size="small"
                      id="outlined"
                      defaultValue={this.state.userdata.dateOfBirth}
                      id="date-picker-dialog"
                      variant="outlined"
                      style={{ width: "85%" }}
                      format="MM/dd/yyyy"
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </div>
              <div>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  Gender
                </span>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    margin="dense"
                    size="small"
                    native
                    defaultValue={this.state.userdata.gender}
                    style={{ width: "85%" }}
                    value={this.state.age}
                    onChange={this.handleAgeChange("age")}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        id="outlined-age-native-simple"
                      />
                    }
                  >
                    <option value={10}>--Select--</option>

                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                  </Select>
                </FormControl>
              </div>
              <div>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  Country
                </span>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    margin="dense"
                    size="small"
                    native
                    style={{ width: "85%" }}
                    value={this.state.age}
                    defaultValue={this.state.userdata.country}
                    onChange={this.handleCountryChange("age")}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        id="outlined-age-native-simple"
                      />
                    }
                  >
                    <option value={10}>--Select--</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="phone">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  classname="spancardscss"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "3px",
                    color: " #a0aeba"
                  }}
                >
                  Phone
                </span>
                <TextField
                  margin="dense"
                  size="small"
                  name="firstname"
                  defaultValue={this.state.userdata.phoneNumber}
                  required
                  id="outlined"
                  variant="outlined"
                  style={{ width: "85%" }}
                  onChange={this.handlePhoneChange}
                />
              </div>
              <div classname="firstname">
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  Phone + Ext
                </span>

                <TextField
                  margin="dense"
                  size="small"
                  name="firstname"
                  defaultValue={this.state.userdata.phoneNo}
                  required
                  id="outlined"
                  variant="outlined"
                  style={{ width: "85%" }}
                  onChange={this.handlePhoneExChange}
                />
              </div>
            </div>

            <div className="phone">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  classname="spancardscss"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "3px",
                    color: " #a0aeba"
                  }}
                >
                  Email{" "}
                </span>
                <TextField
                  margin="dense"
                  size="small"
                  name="firstname"
                  defaultValue={this.state.userdata.email}
                  required
                  id="outlined"
                  variant="outlined"
                  style={{ width: "85%" }}
                  onChange={this.handleLastNameChange}
                />
              </div>
              <div classname="firstname">
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  Address
                </span>

                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  rowsMax="4"
                  defaultValue={this.state.userdata.address}
                  value={this.state.multiline}
                  onChange={this.handleAddressChange}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="name">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  classname="spancardscss"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "3px",
                    color: " #a0aeba"
                  }}
                >
                  Username
                </span>
                <TextField
                  margin="dense"
                  size="small"
                  name="firstname"
                  defaultValue={this.state.userdata.username}

                  required
                  id="outlined"
                  variant="outlined"
                  style={{ width: "85%" }}
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div classname="firstname">
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  Password
                </span>

                <TextField
                  size="small"
                  id="outlined-adornment-password"
                  variant="outlined"
                  defaultValue={this.state.userdata.password}
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
                  style={{ width: "85%" }}
                  onChange={this.handlePassowrdChange}
                />
              </div>
              <div classname="firstname">
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  Confirm Password
                </span>

                <TextField
                  size="small"
                  margin="dense"
                  name="cofpassword"
                  id="outlined-adornment-password"
                  variant="outlined"
                  defaultValue={this.state.userdata.gender}
                  type={this.state.showPassword ? "text" : "password"}
                  label=" confirm "
                  value={this.state.confPassword}
                  onChange={this.handleConfirmPasswordChange("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sytle={{ width: "1px" }}>
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  style={{ width: "85%" }}
                  onChange={this.handlecfrmpasswordChange}
                />
              </div>
            </div>

            <div style={{ display: "flex", padding: "2%" }}>
              <div>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "7px",
                    color: " #a0aeba"
                  }}
                >
                  User Role
                </span>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    margin="dense"
                    size="small"
                    native
                    style={{ width: "85%" }}
                    value={this.state.age}
                    defaultValue={this.state.userdata.country}
                    onChange={this.handleUserRoleChange("age")}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        id="outlined-age-native-simple"
                      />
                    }
                  >
                    <option value={10}>--Select--</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"user"}>User</option>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="photo">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "3%",
                color: " #a0aeba"
              }}
            >
              Photo
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Maximum image size allowed is 2MB.</span>
            </div>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleFileChange}
            />
            <label htmlFor="contained-button-file">
              <div
                style={{ backgroundImage: "url(" + this.state.file + ")" }}
                className="profileupload"
                onClick={() => {
                  console.log("div clicked...");
                }}
              >
                <CloudUploadOutlinedIcon fontSize="large" />
              </div>
            </label>
          </div>
        </div>

        <div className="Permissions">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "3%",
              color: " #a0aeba"
            }}
          >
            Permissions
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              opacity: ".6",
              paddingRight: "6%"
            }}
          >
            <b style={{ marginLeft: "11%" }}>Add</b>{" "}
            <b style={{ marginLeft: "11%" }}> Delete</b>{" "}
            <b style={{ marginLeft: "10%" }}> Modify</b>{" "}
            <b style={{ marginLeft: "9%" }}> Read</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: " #a0aeba"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "3%",
                color: " #a0aeba",
                width: "68%"
              }}
            >
              Web Page
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "66%",
                paddingRight: "4%"
              }}
            >
              <Checkbox
                checked={this.state.add}
                color="default"
                value="checkedG"
                onChange={this.HandleAddchnage}
              />

              <Checkbox
                checked={this.state.delete}
                color="default"
                value="checkedG"
                onChange={this.HandleDeletechnage}
              />

              <Checkbox
                checked={this.state.modify}
                color="default"
                value="checkedG"
                onChange={this.HandleModifychnage}
              />

              <Checkbox
                checked={this.state.read}
                color="default"
                value="checkedG"
                onChange={this.HandleReadchnage}
              />
            </div>
          </div>
          {this.state.list.map(list => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: " #a0aeba"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: "3%",
                  color: " #a0aeba"
                }}
              >
                {list}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: " space-between",
                  width: "49%",
                  paddingRight: "4%"
                }}
              >
                <Checkbox
                  checked={this.state.add}
                  color="default"
                  value="checkedG"
                />

                <Checkbox
                  checked={this.state.delete}
                  color="default"
                  value="checkedG"
                />

                <Checkbox
                  checked={this.state.modify}
                  color="default"
                  value="checkedG"
                />
                <Checkbox
                  checked={this.state.read}
                  color="default"
                  value="checkedG"
                />
              </div>
            </div>
          ))}
        </div>

        <MuiThemeProvider theme={theme}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              paddingTop: "2%"
            }}
          >
            <span onClick={this.handleAddUserChange}>
              <Button variant="contained" color="primary">
                Update user
              </Button>
            </span>
            <span>
              <Button variant="contained">Cancel</Button>
            </span>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Userregistration);
