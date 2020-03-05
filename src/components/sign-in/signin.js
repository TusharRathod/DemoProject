import React, { Component, Fragment } from "react";
import { Paper, Grid, Typography, TextField, Button } from "@material-ui/core";
import { AccountBox } from "@material-ui/icons";
import "./signin.css";
import { SnackBar } from "../../common/snackbar/snackbar";
import { connect } from "react-redux";
import { loginUser } from "../../actions/UserActions";
// import {
//   validateEmail,
//   validatePass
// } from "../../helper/validation/validation";

class signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      message: "",
      variant: "",
      values: {
        email: "",
        password: ""
      },
      errors: {
        email: false,
        password: false
      }
    };
  }

  handleChange = event => {
    this.setState({
      values: { ...this.state.values, [event.target.name]: event.target.value },
      errors: {
        ...this.state.errors,
        [event.target.name]: event.target.value !== "" ? false : true
      }
    });
  };
  submitForm = event => {
    event.preventDefault();

    if (this.state.values.email) {
      if (this.state.values.password) {
        this.props
          .loginUser({
            email: this.state.values.email,
            password: this.state.values.password
          })
          .then(res => {
            if (res.data && res.data.success) {
              this.props.history.push("/home");
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
        // localStorage.setItem("user", JSON.stringify(loginUserDetail));
        // this.props.history.push("/home");
      } else {
        this.setState({
          errors: {
            ...this.state.errors,
            password: true
          }
        });
      }
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          email: true
        }
      });
    }
    // const user = localStorage.getItem("user")
    //   ? JSON.parse(localStorage.getItem("user"))
    //   : { email: "", password: "" };

    // if (user.email === this.state.values.email) {
    //   if (user.password === this.state.values.password) {
    //     localStorage.setItem(
    //       "userLogin",
    //       JSON.stringify({
    //         email: this.state.values.email,
    //         password: this.state.values.password
    //       })
    //     );
    //     this.props.history.push("/home");
    //   } else {
    //     // window.alert("Wrong Password");
    //     this.setState({
    //       alert: true,
    //       message: "Wrong Password",
    //       variant: "error"
    //     });
    //   }
    // } else {
    //   this.setState({
    //     alert: true,
    //     message: "Email not exist",
    //     variant: "error"
    //   });
    // }
  };
  onClose = () => {
    this.setState({ alert: false, message: "", variant: "" });
  };
  render() {
    return (
      <Fragment>
        <div className={"signinContainer"}>
          <Paper className={"signinPaper"} elevation={3}>
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <div className={"leftContainSignin"}>
                  <div className={"accountBoxIconDiv"}>
                    <AccountBox className={"accountBoxIcon"} />
                  </div>
                  <Typography
                    variant="h5"
                    component="h4"
                    className={"logoSignin"}
                  >
                    <span className={"logoSpan"}>W</span>arrior
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h4"
                    className={"subtitleSignin"}
                  >
                    Log-in to warrior account
                  </Typography>
                  <form onSubmit={this.submitForm}>
                    <Grid container spacing={3} className={"formGridContain"}>
                      <Grid item lg={12} md={12} xl={12} xs={12}>
                        <TextField
                          label="Enter Email"
                          id="outlined-size-small"
                          variant="outlined"
                          size="medium"
                          autoFocus={true}
                          type="text"
                          name="email"
                          helperText={
                            this.state.errors.email
                              ? this.state.errors.email &&
                                this.state.values.email
                                ? "Please check your email"
                                : "Email is required"
                              : null
                          }
                          error={this.state.errors.email}
                          value={this.state.values.email}
                          onChange={this.handleChange}
                          color="primary"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={12} md={12} xl={12} xs={12}>
                        <TextField
                          label="Password"
                          id="outlined-size-small"
                          variant="outlined"
                          size="medium"
                          name="password"
                          onChange={this.handleChange}
                          helperText={
                            this.state.errors.password
                              ? this.state.values.password
                                ? "Password must be 6 digit long"
                                : "Password is required"
                              : null
                          }
                          error={this.state.errors.password}
                          value={this.state.values.password}
                          color="primary"
                          type="password"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xl={6} xs={12}>
                        <Button
                          color="primary"
                          size="small"
                          onClick={() => {
                            this.props.history.push("/signup");
                          }}
                          className={"bothBottomButton"}
                        >
                          SignUp
                        </Button>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        md={6}
                        xl={6}
                        xs={12}
                        className={"signinButton"}
                      >
                        <Button
                          color="primary"
                          size="medium"
                          variant="contained"
                          type="submit"
                          className={"bothBottomButton"}
                        >
                          Sign in
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <SnackBar
          open={this.state.alert}
          message={this.state.message}
          variant={this.state.variant}
          onClose={() => this.onClose()}
        />
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return { users: state.users };
}
export default connect(mapStateToProps, { loginUser })(signin);
