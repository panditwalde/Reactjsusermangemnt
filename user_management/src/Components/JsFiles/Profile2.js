import React from "react";
import moment from "moment";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Zoom from "@material-ui/core/Zoom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
class FloatingActionButtonZoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      dateOfBirth: ""
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    let lastLogin = moment(this.props.user.dateOfBirth).format("MMM D YYYY");
    this.setState({
      dateOfBirth: lastLogin
    });
  }
  render() {
    console.log(this.state.value);

    const fabs = [{}, {}];

    return (
      <div style={{ marginLeft: "5%" }}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="General information" />
          <Tab label="Login History" />
        </Tabs>

        {fabs.map((value, index) => (
          <Zoom in={this.state.value === index}>
            <div>
              {this.state.value === 0 ? (
                <div
                  style={{
                    opacity: "0.6",
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    marginTop: "17px"
                  }}
                >
                  <div className="showinfo">
                    <b className="fontdesign">First Name</b>
                    {this.props.user.firstName}
                  </div>
                  <div className="showinfo">
                    <b className="fontdesign">Middle Name</b>
                    {this.props.user.middleName}
                  </div>
                  <div className="showinfo">
                    <b className="fontdesign">Last Name</b>
                    {this.props.user.lastName}
                  </div>
                  <div className="showinfo">
                    <b className="fontdesign">Date of Birth</b>
                    {this.state.dateOfBirth}
                  </div>
                  <div className="showinfo">
                    <b className="fontdesign">Gender</b>
                    {this.props.user.gender}
                  </div>
                  <div className="showinfo">
                    <b className="fontdesign">Country</b>
                    {this.props.user.country}
                  </div>

                  <div className="showinfo">
                    <b className="fontdesign">Phone</b>
                    {this.props.user.phoneNo}
                  </div>
                  <div className="showinfo">
                    <b className="fontdesign">Address</b>
                    {this.props.user.address}
                  </div>
                </div>
              ) : (
                <div style={{ opacity: "0.6" }}>
                  <span
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <AccessTimeIcon fontSize="inherit" />
                    <b className="historylogintitle">
                      {" "}
                      Login history is displayed prior to the last login
                    </b>
                  </span>

                  <div style={{ display: "flex", paddingTop: "4%" }}>
                    >1/27/2020 4:50:25 AM
                  </div>
                </div>
              )}
            </div>
          </Zoom>
        ))}
      </div>
    );
  }
}

export default FloatingActionButtonZoom;
