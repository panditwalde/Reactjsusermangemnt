import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../CssFiles/dashboard.css";
import SpeedIcon from "@material-ui/icons/Speed";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import SettingsIcon from "@material-ui/icons/Settings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Avatar, Paper, Divider } from "@material-ui/core";
import ProfileAvatar from "./ProfileAvatar";
import { getUser, logout } from "./Service";
import DashboardComponents from "./DashboardComponents";
import Profile from "../JsFiles/Profile";
import Edituserdetails from "./Edituserdetails";
import Userlist from "./Userlist";
import Userregistrtion from "./Userregistrtion";
import Toplocation from "./Toplocation";
const drawerWidth = 225;

const OverRidedDrawer = withStyles({
  gutters: {
    paddingRight: 0
  }
})(Drawer);
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 1
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "64px",
    backgroundColor: "black"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class PersistentDrawerLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      isUser: false,
      isWebpage: false,
      user: {},
      isDashboard: true,
      isProfile: false,
      isEditDetails: false,
      isUserList: false,
      isUserRegistration: false,
      isTopLocation: false
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
  };

  handleProfileClick = () => {
    console.log("in handleProfileClick");

    this.setState({
      isDashboard: false,
      isEditDetails: false,
      isProfile: true,
      isUserList: false,
      isUserRegistration: false,
      isTopLocation: false
    });
    this.props.history.push("/dashboard/profile");
  };

  handleDashboardClick = () => {
    this.setState({
      isDashboard: true,
      isProfile: false,
      isEditDetails: false,
      isUserList: false,
      isUserRegistration: false,
      isTopLocation: false
    });
    this.props.history.push("/dashboard/user");
  };

  handleEditDetailsClick = () => {
    console.log("handleEditDetailsClick....");
    
    this.setState({
      isDashboard: false,
      isProfile: false,
      isEditDetails: true,
      isUserList: false,
      isUserRegistration: false,
      isTopLocation: false
    });
    // this.props.history.push("/dashboard/edit");
  };

  handleUserListClick = () => {
    this.setState({
      isDashboard: false,
      isProfile: false,
      isEditDetails: false,
      isUserList: true,
      isUserRegistration: false,
      isTopLocation: false
    });
    this.props.history.push("/dashboard/userList");
  };

  handleUserRegistrationClick = () => {
    this.setState({
      isDashboard: false,
      isProfile: false,
      isEditDetails: false,
      isUserList: false,
      isUserRegistration: true,
      isTopLocation: false
    });
    this.props.history.push("/dashboard/register");
  };

  handleTopLocationClick = () => {
    this.setState({
      isDashboard: false,
      isProfile: false,
      isEditDetails: false,
      isUserList: false,
      isUserRegistration: false,
      isTopLocation: true
    });
    this.props.history.push("/dashboard/locations");
  };
  handleLogoutClick = () => {
    localStorage.clear();
    let token = localStorage.getItem("Token");
    logout(token)
      .then(Response => {})
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/");
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar className="toolbar">
            <div className="userManagementAndSideButton">
              <Typography
                style={{ marginTop: "2%" }}
                className="userManagement"
                color="inherit"
              >
                User Management
              </Typography>
              {this.state.open ? (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerClose}
                >
                  <ChevronLeftIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
            </div>
            <div className="avatarAndAdmin">
              <IconButton>
                <ProfileAvatar user={this.state.user} />
              </IconButton>
              <IconButton color="inherit">
                <Typography>admin</Typography>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <OverRidedDrawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            <ListItem button onClick={this.handleDashboardClick}>
              <ListItemIcon>
                <SpeedIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography type="body2" style={{ color: "#FFFFFF" }}>
                    Dashboard
                  </Typography>
                }
              />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <FileCopyIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography type="body2" style={{ color: "#FFFFFF" }}>
                    Webpages
                  </Typography>
                }
              />
              <ListItemIcon>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={() => {
                    this.setState({ isWebpage: !this.state.isWebpage });
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
            {this.state.isWebpage ? (
              <List>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography type="body2" style={{ color: "#FFFFFF" }}>
                      Webpage 1
                    </Typography>
                  }
                />
                <ListItemText
                  disableTypography
                  primary={
                    <Typography type="body2" style={{ color: "#FFFFFF" }}>
                      Webpage 2
                    </Typography>
                  }
                />
              </List>
            ) : null}
            <ListItem button>
              <ListItemIcon>
                <PersonOutlineIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography type="body2" style={{ color: "#FFFFFF" }}>
                    Users
                  </Typography>
                }
              />
              <ListItemIcon>
                <IconButton
                  style={{ color: "#FFFFFF" }}
                  onClick={() => {
                    this.setState({ isUser: !this.state.isUser });
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
            {this.state.isUser ? (
              <List>
                <ListItemText
                  onClick={this.handleUserRegistrationClick}
                  style={{ cursor: "pointer" }}
                  disableTypography
                  primary={
                    <Typography type="body2" style={{ color: "#FFFFFF" }}>
                      New User
                    </Typography>
                  }
                />
                <ListItemText
                  style={{ cursor: "pointer" }}
                  onClick={this.handleUserListClick}
                  disableTypography
                  primary={
                    <Typography type="body2" style={{ color: "#FFFFFF" }}>
                      Users List
                    </Typography>
                  }
                />
              </List>
            ) : null}
            <ListItem button onClick={this.handleProfileClick}>
              <ListItemIcon>
                <ContactMailIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography type="body2" style={{ color: "#FFFFFF" }}>
                    Profile
                  </Typography>
                }
              />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <SettingsIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography type="body2" style={{ color: "#FFFFFF" }}>
                    Settings
                  </Typography>
                }
              />
              <ListItemIcon>
                <IconButton style={{ color: "#FFFFFF" }}>
                  <ChevronLeftIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>

            <ListItem button onClick={this.handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography type="body2" style={{ color: "#FFFFFF" }}>
                    Logout
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </OverRidedDrawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {this.state.isDashboard ? (
            <DashboardComponents
              handleTopLocationClick={this.handleTopLocationClick}
            />
          ) : null}
          {this.state.isProfile ? (
            <Profile handleEditDetailsClick={this.handleEditDetailsClick} />
          ) : null}
          {this.state.isUserList ? (
            <Userlist handleEditDetailsClick={this.handleEditDetailsClick} />
          ) : null}
          {this.state.isEditDetails ? (
            <Edituserdetails
              handleEditDetailsClick={this.handleEditDetailsClick}
            />
          ) : null}
          {this.state.isUserRegistration ? <Userregistrtion /> : null}
          {this.state.isTopLocation ? <Toplocation /> : null}
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
