import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  // CardHeader,
  // Card,
  // Avatar,
  // IconButton,
  // CardMedia,
  // CardContent,
  // Typography,
  Checkbox,
  Slider,
  Grow,
  Paper,
  Grid,
  Divider,
  Typography
} from "@material-ui/core";
// import { ExpandMore, MoreVert, Favorite, Share } from "@material-ui/icons";
import ProductCard from "./productCard/productCard";
import {
  add_to_wishlist,
  remove_to_wishlist,
  productAll,
  wishlist,
  price_filter
} from "../../../actions/TodoActions";
import { SnackBar } from "../../../common/snackbar/snackbar";
import "./home.css";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { userDetail: state.userDetail.user, products: state.products };
}
const useStyles = theme => ({
  root: {
    flexGrow: 1
  }
});
function valuetext(value) {
  return <span>&#8377;{value}</span>;
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceRange: [0, 5000],
      assured: false,
      products: [],
      wishlist: [],
      alert: false,
      message: "",
      variant: ""
    };
  }
  componentDidMount = () => {
    // if (this.props.products.products && this.props.products.products.length) {
    //   this.setState({
    //     products: this.props.products.products,
    //     wishlist: this.props.products.wishlist,
    //     priceRange: [this.props.products.min, this.props.products.max]
    //   });
    // } else {
    this.productList();
    // }
  };

  // initailState = () => {
  //   this.setState({
  //     products: this.props.products.products,
  //     wishlist: this.props.products.wishlist,
  //     priceRange: [this.props.products.min, this.props.products.max]
  //   });
  // };
  productList = () => {
    this.props.productAll().then(res => {
      if (res.data.success) {
        this.setState({ products: res.data.data, wishlist: res.data.wishlist });
      }
    });
  };
  onFavorite = (id, variant) => {
    let payload = {
      productId: id
    };
    if (variant === "addFavorite") {
      this.props
        .add_to_wishlist(payload)
        .then(res => {
          if (res.data.success && res.data.data.nModified) {
            this.setState({
              wishlist: res.data.wishlist,
              alert: true,
              message: "Add to wishlist",
              variant: "info"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.props.remove_to_wishlist(payload).then(res => {
        if (res.data.success) {
          this.setState({
            wishlist: res.data.wishlist,
            alert: true,
            message: "Remove from wishlist",
            variant: "info"
          });
        }
      });
    }
  };
  priceFilter = (event, newValue) => {
    // this.props.price_filter(newValue[0], newValue[1]);
    // this.initailState();
    let filteredItem = this.state.products.map(item => {
      return {
        ...item,
        favorite: item.price > newValue[0] && item.price < newValue[1]
      };
    });
    this.setState({ priceRange: newValue, products: filteredItem });
  };
  assured = event => {
    this.setState({ assured: event.target.checked });
  };
  cardDetailPage = id => {
    this.props.history.push("/product_detail/" + id);
  };
  onClose = () => {
    this.setState({ alert: false, message: "", variant: "" });
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={"homeContainer"}>
        <Grid container className={classes.root} spacing={1}>
          <Grid item xs={12} md={3} lg={3} xl={3}>
            <Paper style={{ minHeight: 530 }} elevation={3}>
              <div className={"filtersText"}>Filters</div>
              <Divider />
              <div className={"priceRangeSlide"}>
                <Typography variant="inherit">Price</Typography>
                <Slider
                  value={this.state.priceRange}
                  onChange={this.priceFilter}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  className={"slider"}
                  step={10}
                  max={5000}
                  min={0}
                />
              </div>
              <Divider />
              <div className={"assuredLogoDiv"}>
                <div style={{ padding: 10 }}>
                  <span className="logoW">
                    <i>W</i>
                  </span>
                  <span style={{ fontSize: 12 }}>
                    <i>Assured</i>
                  </span>
                </div>
                <div>
                  <Checkbox
                    checked={this.state.assured}
                    onChange={this.assured}
                    value="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </div>
              </div>
              <Divider />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={9} xl={9}>
            <Paper style={{ display: "flex", padding: 10 }}>
              {" "}
              <Grid container className={classes.root} spacing={1}>
                {this.state.products.length ? (
                  this.state.products.map((data, index) => {
                    let isLike = this.state.wishlist.indexOf(data._id) !== -1;
                    return (
                      data.favorite && (
                        <Grow key={index} in={true}>
                          <Grid item xs={6} md={3} lg={3} xl={3}>
                            <ProductCard
                              data={data}
                              favorite={isLike}
                              onFavorite={(id, variant) =>
                                this.onFavorite(id, variant)
                              }
                              cardDetailPage={id => this.cardDetailPage(id)}
                            />
                          </Grid>
                        </Grow>
                      )
                    );
                  })
                ) : (
                  <h1>No item in this list</h1>
                )}
              </Grid>
              {/*elevation={1} */}
            </Paper>
          </Grid>
        </Grid>
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

export default connect(mapStateToProps, {
  productAll,
  add_to_wishlist,
  remove_to_wishlist,
  wishlist,
  price_filter
})(withStyles(useStyles)(Home));
