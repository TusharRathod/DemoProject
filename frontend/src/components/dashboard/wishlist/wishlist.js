import React, { Component, Fragment } from "react";
import { priceFormat } from "../../../common/priceFormat/priceFormat";
import { connect } from "react-redux";
import {
  Paper,
  List,
  ListItem,
  Divider,
  Grid,
  Typography,
  IconButton,
  Popover,
  Button
} from "@material-ui/core";
import { Star, Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import profile from "../../../assets/profile-pic.svg";
import { wishlist, remove_to_wishlist } from "../../../actions/TodoActions";
import { SnackBar } from "../../../common/snackbar/snackbar";
import "./wishlist.css";

const useStyles = theme => ({
  rating: {
    display: "flex",
    padding: "5px 0px 20px 0px"
  },
  ratingBox: {
    backgroundColor: "green",
    borderRadius: "3px",
    padding: "1px"
  },
  ratingDigit: {
    color: "white",
    fontSize: "12px",
    padding: "3px",
    fontWeight: 500
  },
  reviews: {
    paddingLeft: 10,
    color: "gray"
  },
  starIcon: {
    fontSize: 11,
    color: "white",
    paddingRight: "3px"
  },
  price: {
    fontWeight: 600,
    fontSize: "19px"
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
});

function mapStateToProps(state) {
  return { products: state.todos };
}

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseId: "",
      anchorEl: null,
      openPopover: false,
      id: "",
      products: []
    };
  }

  componentDidMount = () => {
    this.getList();
  };
  getList = () => {
    this.props.wishlist().then(res => {
      if (res.data.success) {
        this.setState({ products: res.data.wishlist });
      }
    });
  };
  enterMouse = mouseId => {
    this.setState({ mouseId });
  };
  leaveMouse = () => {
    this.setState({ mouseId: "" });
  };
  deleteFromWishlist = (event, id) => {
    this.setState({ anchorEl: event.currentTarget, openPopover: true, id });
  };
  handleClose = () => {
    this.setState({ anchorEl: null, openPopover: false });
  };
  removeFromWishlist = () => {
    let payload = {
      productId: this.state.id
    };
    this.props.remove_to_wishlist(payload).then(res => {
      if (res.data.success && res.data.data.nModified) {
        this.getList();
        this.setState({
          alert: true,
          message: "Item Removed!!!",
          variant: "info"
        });
      }
    });
    this.handleClose();
  };
  detailPage = id => {
    this.props.history.push("/product_detail/" + id);
  };
  onClose = () => {
    this.setState({ alert: false, message: "", variant: "" });
  };
  render() {
    const user = JSON.parse(localStorage.getItem("warrior"));
    const { classes } = this.props;
    return (
      <div className={"wishlistContainer"}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3} lg={3} xl={3}>
            <Paper elevation={3} className={"profilePaper"}>
              <div className={"profileConatiner"}>
                <div className={"profileImageDiv"}>
                  <img
                    src={profile}
                    alt="profile"
                    style={{ height: 60, width: 60 }}
                  />
                </div>
                <div className={"profileNameContainer"}>
                  <Typography variant="subtitle2" component="div">
                    Hello,
                  </Typography>
                  <div className={"profileName"}>{user.firstName}</div>
                </div>
              </div>
            </Paper>{" "}
          </Grid>
          <Grid item xs={12} md={9} lg={9} xl={9}>
            <Paper elevation={3} className={"wishlistPaper"}>
              <div className={"wishlistHead"}>My Wishlist</div>
              <Divider />
              <List
                className={"list"}
                disablePadding={true}
                aria-label="main mailbox folders"
              >
                {this.state.products.map((product, index) => {
                  var {
                    imgUrl,
                    name,
                    price,
                    rating,
                    review,

                    _id,
                    id,
                    actualPrice,
                    discountPercent
                  } = product;
                  return (
                    <Fragment key={index}>
                      <ListItem className={"wishlistItem"}>
                        <Grid container spacing={0}>
                          <Grid item xs={5} md={2} lg={2} xl={2}>
                            <img
                              src={imgUrl}
                              alt="favorite"
                              style={{ height: 90, width: "85%" }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={9}
                            lg={9}
                            xl={9}
                            onMouseEnter={() => this.enterMouse(id)}
                            onMouseLeave={() => this.leaveMouse()}
                            onClick={() => this.detailPage(_id)}
                          >
                            <Typography
                              variant="body2"
                              style={
                                this.state.mouseId === id
                                  ? {
                                      color: "#3f51b5",
                                      opacity: 2.0
                                    }
                                  : {
                                      color: "rgba(0, 0, 0, 0.87)"
                                      // opacity: 0.5
                                    }
                              }
                            >
                              {name}
                            </Typography>
                            <div className={classes.rating}>
                              <Paper className={classes.ratingBox}>
                                <span className={classes.ratingDigit}>
                                  {rating}
                                </span>
                                <Star className={classes.starIcon} />
                              </Paper>
                              <div className={classes.reviews}>({review})</div>
                            </div>
                            <div className={"priceOfferDiv"}>
                              <Typography
                                variant="h6"
                                className={classes.price}
                              >
                                &#8377; {priceFormat(price)}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                className={"actualPrice"}
                              >
                                &#8377; {priceFormat(actualPrice)}
                              </Typography>
                              <div className={"discountPercent"}>
                                {discountPercent}% off
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={1} md={1} lg={1} xl={1}>
                            <div className={"deleteFromWishlist"}>
                              <IconButton
                                onClick={e => this.deleteFromWishlist(e, _id)}
                                className={classes.iconButton}
                              >
                                <Delete style={{ fontSize: 20 }} />
                              </IconButton>
                            </div>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </Fragment>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Popover
          id={this.state.openPopover ? "simple-popover" : undefined}
          open={this.state.openPopover}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorReference="anchorEl"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Paper style={{ width: "100%", height: 60, padding: 10 }}>
            <Typography variant="body2">
              Are you sure you want to remove this product?
            </Typography>
            <div style={{ padding: 10, textAlign: "center" }}>
              <Button
                onClick={this.handleClose}
                size="small"
                style={{ fontSize: 11, color: "gray" }}
              >
                cancel
              </Button>
              <Button
                onClick={this.removeFromWishlist}
                style={{ fontSize: 11, color: "red", paddingLeft: 15 }}
                size="small"
              >
                Yes,Remove
              </Button>
            </div>
          </Paper>
        </Popover>
        <SnackBar
          open={this.state.alert}
          message={this.state.message}
          variant={this.state.variant}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, { wishlist, remove_to_wishlist })(
  withStyles(useStyles)(Wishlist)
);
