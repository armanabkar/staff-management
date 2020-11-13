import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  withStyles,
  Button,
  Paper,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/staff";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  openButton: {
    margin: "0.3rem 0 0 1rem",
  },
});

const initialFieldValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  salary: "",
  address: "",
};

const StaffForm = ({ classes, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  //toast msg.
  const { addToast } = useToasts();

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile ? "" : "This field is required.";
    if ("salary" in fieldValues)
      temp.salary = fieldValues.salary ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId === 0) {
        props.createStaff(values, onSuccess);
        setIsOpen(false);
      } else {
        props.updateStaff(props.currentId, values, onSuccess);
      }
    }
  };

  const setOpen = () => {
    if (props.currentId !== 0) props.setCurrentId(0);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.staffList.find((x) => x.id === props.currentId),
      });
      setErrors({});
      setIsOpen(true);
    }
  }, [props.currentId, setValues, setErrors, props.staffList, setIsOpen]);

  return (
    <>
      {!isOpen ? (
        <Button
          variant="outlined"
          className={classes.openButton}
          onClick={setOpen}
          color="black"
        >
          Add a new Member
        </Button>
      ) : (
        <Paper className={classes.paper} elevation={3}>
          <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid xs={8}>
                <TextField
                  name="fullName"
                  variant="outlined"
                  label="Full Name"
                  value={values.fullName}
                  onChange={handleInputChange}
                  {...(errors.fullName && {
                    error: true,
                    helperText: errors.fullName,
                  })}
                />
                <TextField
                  name="email"
                  variant="outlined"
                  label="Email"
                  value={values.email}
                  onChange={handleInputChange}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
                <TextField
                  name="salary"
                  variant="outlined"
                  label="Salary"
                  value={values.salary}
                  onChange={handleInputChange}
                  {...(errors.salary && {
                    error: true,
                    helperText: errors.salary,
                  })}
                />
                <TextField
                  name="mobile"
                  variant="outlined"
                  label="Mobile"
                  value={values.mobile}
                  onChange={handleInputChange}
                  {...(errors.mobile && {
                    error: true,
                    helperText: errors.mobile,
                  })}
                />
                <TextField
                  name="age"
                  variant="outlined"
                  label="Age"
                  value={values.age}
                  onChange={handleInputChange}
                />
                <TextField
                  name="address"
                  variant="outlined"
                  label="Address"
                  value={values.address}
                  onChange={handleInputChange}
                />
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.smMargin}
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                  <Button className={classes.smMargin} onClick={setOpen}>
                    Dismiss
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  staffList: state.staff.list,
});

const mapActionToProps = {
  createStaff: actions.create,
  updateStaff: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(StaffForm));
