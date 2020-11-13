import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/staff";
import {
  Grid,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import StaffForm from "./StaffForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const StaffList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllStaffList();
  }, [props]); //componentDidMount

  //toast msg.
  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteStaff(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };
  return (
    <>
      <br />
      <StaffForm {...{ currentId, setCurrentId }} />
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid>
            <TableContainer>
              <TableContainer>
                <TableHead className={classes.root}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.staffList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.fullName}</TableCell>
                        <TableCell>{record.mobile}</TableCell>
                        <TableCell>{record.age}</TableCell>
                        <TableCell>{record.salary} $</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.address}</TableCell>
                        <TableCell>
                          <ButtonGroup variant="text">
                            <Button>
                              <EditIcon
                                color="primary"
                                onClick={() => {
                                  setCurrentId(record.id);
                                }}
                              />
                            </Button>
                            <Button>
                              <DeleteIcon
                                color="secondary"
                                onClick={() => onDelete(record.id)}
                              />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableContainer>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({
  staffList: state.staff.list,
});

const mapActionToProps = {
  fetchAllStaffList: actions.fetchAll,
  deleteStaff: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(StaffList));
