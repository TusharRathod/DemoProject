import React, { Component } from "react";
import {
  // CardHeader,
  Card,
  // Avatar,
  IconButton,
  // CardMedia,
  // CardContent,
  Typography,
  // CardActions,
  Paper
  // Grow
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { priceFormat } from "../../../../common/priceFormat/priceFormat";
import "./productCard.css";
import { Star, Favorite } from "@material-ui/icons";

const useStyles = theme => ({
  card: {
    height: "auto"
  },
  media: {
    height: 250
    // paddingTop: "56.25%" // 16:9
  },
  wishlistButtonDiv: {
    position: "absolute"
    // paddingLeft: "182px"
  },
  CardContent: {
    padding: 5
  },
  rating: {
    display: "flex",
    paddingBottom: 3
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
    fontSize: "17px"
  },
  wishlistButtonDivPosition: {
    display: "flex",
    justifyContent: "flex-end"
  },
  cartButton: {
    textTransform: "none"
  },
  priceAndCartDiv: {
    display: "flex",
    justifyContent: "space-between"
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
});

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, data, favorite } = this.props;
    var {
      imgUrl,
      name,
      price,
      rating,
      review,
      // id,
      actualPrice,
      discountPercent,
      _id
    } = data;
    return (
      <Card className={classes.card}>
        {/* <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
        <div className={classes.wishlistButtonDivPosition}>
          <div className={classes.wishlistButtonDiv}>
            {favorite ? (
              <IconButton
                className={classes.iconButton}
                aria-label="add to favorites"
                onClick={() => this.props.onFavorite(_id, "removeFavorite")}
              >
                <Favorite style={{ color: "red" }} />
              </IconButton>
            ) : (
              <IconButton
                className={classes.iconButton}
                aria-label="remove to favorites"
                onClick={() => this.props.onFavorite(_id, "addFavorite")}
              >
                <Favorite />
              </IconButton>
            )}
          </div>
        </div>
        {/* <CardMedia
          className={classes.media}
          image={imgUrl}
          // title="Hiking Bag"
        /> */}
        <div
          className={"cardContent"}
          onClick={() => this.props.cardDetailPage(_id)}
        >
          <div className={classes.media}>
            <img
              src={imgUrl}
              style={{ height: "100%", width: "100%" }}
              alt="product"
            />
          </div>

          <div className={classes.CardContent}>
            <Typography
              variant="subtitle2"
              component="div"
              style={{ height: 40, paddingBottom: 5 }}
            >
              {name}
            </Typography>
            <div className={classes.rating}>
              <Paper className={classes.ratingBox}>
                <span className={classes.ratingDigit}>{rating}</span>
                <Star className={classes.starIcon} />
              </Paper>
              <div className={classes.reviews}>({review})</div>
            </div>
            <div className={classes.priceAndCartDiv}>
              <div className={"priceOfferDiv"}>
                <Typography variant="h6" className={classes.price}>
                  &#8377; {priceFormat(price)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={"productCardActualPrice"}
                >
                  &#8377; {priceFormat(actualPrice)}
                </Typography>
                <div className={"productCardDiscountPercent"}>
                  {discountPercent}% off
                </div>
              </div>
              {/* <Typography variant="h6" className={classes.price}>
              &#8377; {price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.cartButton}
              startIcon={<ShoppingCart />}
            >
              Add to cart
            </Button> */}
            </div>
          </div>
          {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions> */}
          {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <Typography paragraph>Method:</Typography>
      <Typography paragraph>
        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
        minutes.
      </Typography>
      <Typography paragraph>
        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
      </Typography>
      <Typography paragraph>
        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
        again without stirring, until mussels have opened and rice is just tender, 5 to 7
        minutes more. (Discard any mussels that don’t open.)
      </Typography>
      <Typography>
        Set aside off of the heat to let rest for 10 minutes, and then serve.
      </Typography>
    </CardContent>
  </Collapse> */}
        </div>
      </Card>
    );
  }
}
export default withStyles(useStyles)(ProductCard);
