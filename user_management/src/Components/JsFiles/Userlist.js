import React from "react";
import classNames from "classnames";
import "../CssFiles/Userlist.css";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import { getAllUser, getUserList } from "./Service";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#00a0f0",
        height: "35px"
      }
    },
    MuiFormControl: {
      root: {
        verticalAlign: "baseline"
      }
    }
  }
});

function stableSort(array) {
  return array;
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    ></Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class EnhancedTable extends React.Component {
  state = {
    getallusersarray: [],
    selected: [],
    genralinfo: [
      " ",
      "Name",
      "Email",
      "Dob",
      "Status",
      "Role",
      "Account",
      "Action"
    ],

    page: 0,
    rowsPerPage: 5
  };
  handleChange = name => event => {
    console.log(event.target.value);

    this.setState({ value: event.target.value });
  };

  // edituserDetailsChange = user => {
  //   console.log(this.props.props.history.push({
  //     pathname: "/dashboard/edit/" + user.firstName,
  //     state: { user: user }
  //   }));

  //   this.props.props.history.push({
  //     pathname: "/dashboard/edit/" + user.firstName,
  //     state: { user: user }
  //   });
  // };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  handleEditDetailsClick=(user)=>{

  alert("hello");
    console.log(user);
    console.log("props"+this.props);
    
    this.props.history.push({pathname:"/dashboard/edit/:user"+user.firstName,state:{user:user}})
    
  }
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  getAllUsers = () => {
    let token = localStorage.getItem("Token");
    let array = [];
    getUserList(token)
      .then(Response => {
        Response.data.data.forEach(element => {
          array.push(element);
        });
        this.setState({ getallusersarray: array });
      })

      .catch(err => {
        console.log("not  found");
      });

    stableSort(this.state.getallusersarray);
  };

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    const { getallusersarray, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, getallusersarray.length - page * rowsPerPage);

    return (
      <div className="mainUserList">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "5%"
          }}
        >
          <TextField
            id="outlined-search"
            placeholder="Search..."
            type="search"
            variant="outlined"
            margin="dense"
            size="small"
          />
          <MuiThemeProvider theme={theme}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                fontSize="small"
                startIcon={<PersonOutlineIcon />}
              >
                New user
              </Button>
            </div>
          </MuiThemeProvider>
        </div>

        <Table>
          <div style={{ display: "contents" }}>
            {this.state.genralinfo.map(info => (
              <TableCell
                component="th"
                scope="row"
                padding="none"
                style={{
                  fontFamily: "inherit",
                  fontSize: "initial",
                  fontStyle: "normal",
                  fontVariant: "full-width"
                }}
              >
                {info}
              </TableCell>
            ))}{" "}
          </div>

          <TableBody>
            {stableSort(getallusersarray)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => {
                const isSelected = this.isSelected(n.id);

                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      <Avatar alt="Remy Sharp" src={n.profilePicture} />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      {n.firstName + " " + n.lastname}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      {n.email}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      {n.dateOfBirth}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      {n.status == true ? (
                        <div style={{ color: "#41B314" }}>Active</div>
                      ) : (
                        <div style={{ color: "red" }}>Inactive</div>
                      )}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      {n.userRole}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      <LockOpenIcon />
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      style={{ paddingTop: "15px" }}
                    >
                      <Tooltip title=" Edit user details">
                        <EditIcon
                          onClick={()=>{
                            console.log("Edit ICon");
                            
                            // this.handleEditDetailsClick(n)
                          }}
                        />
                      </Tooltip>
                      <Tooltip title=" delete user ">
                        <DeleteIcon />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 20, 50, 100]}
          component="div"
          count={getallusersarray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
