import React, { Component } from "react";
import { connect } from "react-redux";
import "./myprofile.css";
import {
  uploadImage,
  uploadCoverImage,
  getUser
} from "../../../actions/UserActions";
import {
  Paper,
  // Badge,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";
import profileIcon from "../../../assets/profile-pic.svg";
import coverImage from "../../../assets/cover1.jpg";
import { Edit } from "@material-ui/icons";

function mapStateToProps(state) {
  return {};
}
// const StyledBadge = withStyles(theme => ({
//   badge: {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "$ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""'
//     }
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0
//     }
//   }
// }))(Badge);

class Myprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayUserProfile: "",
      user: {},
      displayUserCover: ""
    };
  }
  componentDidMount = () => {
    this.getUser();
  };
  getUser = () => {
    this.props.getUser().then(res => {
      if (res.data.success) {
        this.setState({
          user: res.data.data,
          displayUserProfile: res.data.data.img,
          displayUserCover: res.data.data.coverImage
        });
      } else {
        console.log("user not found");
      }
    });
  };
  imgUpload = event => {
    var fd = new FormData();
    event.target.files[0].name &&
      fd.append("image", event.target.files[0], event.target.files[0].name);

    this.props.uploadImage(fd).then(res => {
      if (res.data.success) {
        this.setState({
          user: res.data.data,
          displayUserProfile: res.data.data.img
        });
      }
    });
    // if (event.target.files.length) {
    //   var reader = new FileReader();
    //   reader.onloadend = () => {
    //     this.setState({ displayCompanyLogo: reader.result });
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    //   this.setState({
    //     uploadedLogo: event.target.files[0], touched: {
    //       ...this.state.touched,
    //       uploadedLogo: true
    //     }
    //   });
    // }
  };
  coverImgUpload = event => {
    var fd = new FormData();
    fd.append("image", event.target.files[0], event.target.files[0].name);
    this.props.uploadCoverImage(fd).then(res => {
      if (res.data.success) {
        this.setState({
          user: res.data.data,
          displayUserCover: res.data.data.coverImage
        });
      }
    });
  };
  render() {
    return (
      <div className={"myprofileContainer"}>
        <div className={"profilePaperDiv"}>
          <Paper className={"myprofilePaper"} elevation={3}>
            <div>
              <div>
                <img
                  alt={this.state.user.firstName}
                  className={"userCoverImage"}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = coverImage;
                  }}
                  src={
                    this.state.displayUserCover
                      ? process.env.REACT_APP_ORIGINE +
                        this.state.displayUserCover
                      : ""
                  }
                />
              </div>
              <div className="userProfileDiv">
                {/* <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  variant="dot"
                > */}
                <div style={{ height: 130, width: 130 }}>
                  <img
                    alt={this.state.user.firstName}
                    className={"userProfile"}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = profileIcon;
                    }}
                    src={
                      this.state.displayUserProfile
                        ? process.env.REACT_APP_ORIGINE +
                          this.state.displayUserProfile
                        : ""
                    }
                  />
                </div>

                {/* </StyledBadge> */}
                <div className={"coverImageButton"}>
                  <input
                    accept="image/*"
                    className={"fileInput"}
                    id="cover-image"
                    multiple
                    type="file"
                    onChange={this.coverImgUpload}
                  />
                  <label htmlFor="cover-image">
                    <IconButton component="span">
                      <Edit style={{ color: "white", fontSize: 30 }} />
                    </IconButton>
                  </label>
                </div>
              </div>

              <div className={"userDetailDiv"}>
                <div className={"uploadButton"}>
                  <input
                    accept="image/*"
                    className={"fileInput"}
                    id="outlined-button-file"
                    multiple
                    type="file"
                    onChange={this.imgUpload}
                  />
                  <label htmlFor="outlined-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </div>

                <div>
                  <Typography variant="h5">
                    {this.state.user.firstName}
                    {"  "}
                    {this.state.user.lastName}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    {this.state.user.email}
                  </Typography>
                </div>
              </div>
              {/* <div className={"profileDiv"}>
                {this.state.displayCompanyLogo ? (
                  <img
                    alt="displayCompanyLogo"
                    src={this.state.displayCompanyLogo}
                    // onError={e => {
                    //   e.target.onerror = null;
                    //   e.target.src = profileIcon;
                    // }}
                    className={"profileImg"}
                  />
                ) : null}
              </div> */}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  uploadImage,
  uploadCoverImage,
  getUser
})(Myprofile);
