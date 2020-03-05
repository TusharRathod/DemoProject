import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Paper } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { getProductDetail } from "../../../actions/TodoActions";
import { priceFormat } from "../../../common/priceFormat/priceFormat";
import "./productDetail.css";

function mapStateToProps(state) {
  return {};
}
const useStyles = theme => ({
  rating: {
    display: "flex",
    paddingTop: "10px"
  },
  ratingBox: {
    backgroundColor: "green",
    height: "22px",
    width: "52px",
    padding: "1px",
    borderRadius: "10px"
  },
  ratingDigit: {
    color: "white",
    fontSize: "17px",
    padding: "5px",
    fontWeight: 500
  },
  reviews: {
    paddingLeft: 10,
    color: "gray"
  },
  starIcon: {
    fontSize: 15,
    color: "white",
    marginTop: "3px"
  }
});
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount = () => {
    this.product_detail();
  };

  product_detail = () => {
    var id = this.props.match.params.id;
    this.props.getProductDetail(id).then(res => {
      if (res.data.success) {
        this.setState({ data: res.data.data });
      }
    });
  };
  render() {
    const { classes } = this.props;
    var {
      imgUrl,
      name,
      price,
      actualPrice,
      discountPercent,
      rating,
      review
    } = this.state.data;
    return (
      <div className="productDetailContainer">
        {name && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} lg={5} xl={5}>
              <div>
                <img
                  src={imgUrl}
                  style={{ height: 350, width: "100%" }}
                  alt="product"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={7} lg={7} xl={7}>
              <div>
                <Typography variant="h5">{name}</Typography>
              </div>
              <div className="productDetailPrice">
                <Typography variant="h4">
                  &#8377; {priceFormat(price)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={"productCardDetailActualPrice"}
                >
                  &#8377; {priceFormat(actualPrice)}
                </Typography>
                <div className={"productCardDetailDiscountPercent"}>
                  {discountPercent}% off
                </div>
              </div>
              <div className={classes.rating}>
                <Paper className={classes.ratingBox}>
                  <span className={classes.ratingDigit}>{rating}</span>
                  <Star className={classes.starIcon} />
                </Paper>
                <div className={classes.reviews}>({review})</div>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, { getProductDetail })(
  withStyles(useStyles)(ProductDetail)
);
