import React, { Component, Fragment } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button
} from "@material-ui/core";
import Account from "../../assets/account.svg";
import {
  validateEmail,
  validatePass
} from "../../helper/validation/validation";
import { SnackBar } from "../../common/snackbar/snackbar";
import { connect } from "react-redux";
import { registerUser } from "../../actions/UserActions";
import "./signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      message: "",
      variant: "",
      values: {
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        password: "",
        confirm: "",
        login: false
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        mobileNo: false,
        password: false,
        confirm: false
      }
    };
  }
  handleChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value
      },
      errors: {
        ...this.state.errors,
        [event.target.name]: event.target.value !== "" ? false : true
      }
    });
  };
  submitForm = event => {
    event.preventDefault();
    var {
      firstName,
      lastName,
      email,
      mobileNo,
      password,
      confirm
      // login
    } = this.state.values;
    let isEmail = validateEmail(email + "@warrior.com");
    let isPass = validatePass(password);
    this.setState({
      errors: {
        firstName: firstName === "",
        lastName: lastName === "",
        email: !isEmail,
        mobileNo: mobileNo === "",
        password: !isPass,
        confirm: password !== confirm
      }
    });
    if (
      firstName &&
      lastName &&
      isEmail &&
      mobileNo &&
      isPass &&
      password === confirm
    ) {
      this.props
        .registerUser({
          firstName,
          lastName,
          email: email + "@warrior.com",
          mobileNo,
          password
        })
        .then(res => {
          if (res.data.success) {
            this.setState({
              alert: true,
              message: res.data.message,
              variant: "success",
              values: {
                firstName: "",
                lastName: "",
                email: "",
                mobileNo: "",
                password: "",
                confirm: ""
              }
            });
            this.props.history.push("/sign-in");
          } else {
            this.setState({
              alert: true,
              message: res.data.message,
              variant: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  onClose = () => {
    this.setState({ alert: false, message: "", variant: "" });
  };
  render() {
    return (
      <Fragment>
        <div className={"signupContainer"}>
          <Paper className={"signupPaper"} elevation={3}>
            <Grid container spacing={3}>
              <Grid item lg={7} md={7} xl={7} xs={12}>
                <div className={"leftContainSignup"}>
                  <Typography
                    variant="h5"
                    component="h4"
                    className={"logoSignup"}
                  >
                    <span className={"logoSpan"}>W</span>arrior
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h4"
                    className={"subtitleSignup"}
                  >
                    Create your Warrior Account
                  </Typography>
                  <form onSubmit={this.submitForm}>
                    <Grid container spacing={3} className={"formGridContain"}>
                      <Grid item lg={6} md={6} xl={6} xs={12}>
                        <TextField
                          label="First Name"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          name="firstName"
                          autoFocus={true}
                          helperText={
                            this.state.errors.firstName
                              ? "First name required"
                              : null
                          }
                          error={this.state.errors.firstName}
                          value={this.state.values.firstName}
                          onChange={this.handleChange}
                          color="primary"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xl={6} xs={12}>
                        <TextField
                          label="Last Name"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          name="lastName"
                          onChange={this.handleChange}
                          color="primary"
                          helperText={
                            this.state.errors.lastName
                              ? "Last name required"
                              : null
                          }
                          value={this.state.values.lastName}
                          error={this.state.errors.lastName}
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={12} md={12} xl={12} xs={12}>
                        <TextField
                          label="Username"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          color="primary"
                          name="email"
                          helperText={
                            this.state.errors.email ? "Username required" : null
                          }
                          error={this.state.errors.email}
                          onChange={this.handleChange}
                          value={this.state.values.email}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <span>@warrior.com</span>
                              </InputAdornment>
                            )
                          }}
                          fullWidth
                        />
                      </Grid>
                      {!this.state.errors.email && (
                        <span className={"fieldSubtitle"}>
                          You can use letters,numbers & periods
                        </span>
                      )}
                      <Grid item lg={12} md={12} xl={12} xs={12}>
                        <TextField
                          label="Mobile Number"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          color="primary"
                          name="mobileNo"
                          helperText={
                            this.state.errors.mobileNo
                              ? "Mobile Number required"
                              : null
                          }
                          error={this.state.errors.mobileNo}
                          onChange={this.handleChange}
                          value={this.state.values.mobileNo}
                          type="text"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                +91
                              </InputAdornment>
                            )
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xl={6} xs={12}>
                        <TextField
                          label="Password"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          name="password"
                          onChange={this.handleChange}
                          helperText={
                            this.state.errors.password
                              ? this.state.errors.password &&
                                this.state.values.password
                                ? "Password must be 6 digit long"
                                : "Password is required"
                              : null
                          }
                          value={this.state.values.password}
                          error={this.state.errors.password}
                          color="primary"
                          type="password"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xl={6} xs={12}>
                        <TextField
                          label="Confirm"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          name="confirm"
                          helperText={
                            this.state.errors.confirm
                              ? "Password does not match"
                              : null
                          }
                          value={this.state.values.confirm}
                          error={this.state.errors.confirm}
                          onChange={this.handleChange}
                          color="primary"
                          type="password"
                          fullWidth
                        />
                      </Grid>
                      {!this.state.errors.password && (
                        <span className={"fieldSubtitle"}>
                          Use 8 or more characters with a mix of letters,
                          numbers & symbols
                        </span>
                      )}

                      <Grid item lg={6} md={6} xl={6} xs={12}>
                        <Button
                          color="primary"
                          size="small"
                          onClick={() => this.props.history.push("/sign-in")}
                          className={"bothBottomButton"}
                        >
                          Sign in instead
                        </Button>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        xl={6}
                        xs={12}
                        className={"signupButton"}
                      >
                        <Button
                          color="primary"
                          size="medium"
                          variant="contained"
                          type="submit"
                          className={"bothBottomButton"}
                        >
                          Signup
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
              <Grid item lg={5} md={5} xl={5} xs={12}>
                <div className={"accountImg"}>
                  <img
                    src={Account}
                    alt="account"
                    style={{ width: 300, height: 300 }}
                  />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <SnackBar
          open={this.state.alert}
          message={this.state.message}
          variant={this.state.variant}
          onClose={this.onClose}
        />
      </Fragment>
    );
  }
}

export default connect(null, { registerUser })(Signup);
