import React, { Fragment } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Badge,
  Avatar,
  Typography,
  IconButton,
  InputBase
} from "@material-ui/core";

import { Search, ShoppingCart, MoreVert } from "@material-ui/icons";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
// import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { logout } from "../../../../actions/UserActions";
import "./header.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  accountCircle: {
    fontSize: 35
  },
  userName: {
    fontSize: 20
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 300
    }
  },
  sectionMobile: {
    display: "contents",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "contents"
    }
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}));

const Header = props => {
  const classes = useStyles();
  const { children } = props;
  // const [setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  var user = JSON.parse(localStorage.getItem("warrior"));
  // const handleChange = event => {
  //   setAuth(event.target.checked);
  // };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    props
      .logout({ id: user._id })
      .then(res => {
        if (res.data.success) {
          children.history.push("/sign-in");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const changeTab = tab => {
    children.history.push("/" + tab);
    handleMobileMenuClose();
    setAnchorEl(null);
  };
  const onSearch = event => {
    setSearchText(event.target.value);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={"primary-search-account-menu-mobile"}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => changeTab("home")}>
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton> */}
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={() => changeTab("wishlist")}>
        {/* <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <p>Wishlist</p>
      </MenuItem>
      <MenuItem onClick={() => changeTab("cart")}>
        <ShoppingCart />
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.sectionMobile}>
            <Typography variant="h5" component="h4" className={"logoHeader"}>
              <span className={"logoSpanHeader"}>W</span>arrior
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                name="search"
                onChange={onSearch}
                value={searchText}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <div className={classes.sectionDesktop}>
            <Typography variant="h5" component="h4" className={"logoHeader"}>
              <span className={"logoSpanHeader"}>W</span>arrior
            </Typography>
            <div
              className={
                children.match.path === "/home" ? "activeTab" : "inactiveTab"
              }
            >
              <span
                className={"cursorPointer"}
                onClick={() => changeTab("home")}
              >
                Home
              </span>
            </div>
            <div
              className={
                children.match.path === "/wishlist"
                  ? "activeTab"
                  : "inactiveTab"
              }
            >
              <span
                className={"cursorPointer"}
                onClick={() => changeTab("wishlist")}
              >
                Wishlist
              </span>
            </div>
            <div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  name="search"
                  onChange={onSearch}
                  value={searchText}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
            <div
              className={
                children.match.path === "/cart" ? "activeTab" : "inactiveTab"
              }
            >
              <div
                className={"cursorPointer"}
                onClick={() => changeTab("cart")}
              >
                <Badge badgeContent={1} color="secondary">
                  <ShoppingCart
                    className={
                      children.match.path === "/cart"
                        ? "activeTab"
                        : "inactiveTab"
                    }
                  />{" "}
                  <div className={"cartText"}>Cart</div>
                </Badge>
              </div>
            </div>
          </div>
          <Typography variant="h6" className={classes.title}></Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.iconButton}
            >
              <Avatar
                alt={user && user.firstName}
                src={user.img && process.env.REACT_APP_ORIGINE + user.img}
              >
                {user && user.firstName[0].toUpperCase()}
              </Avatar>
              {/* <AccountCircle className={classes.accountCircle} />{" "}
              <span className={classes.userName}>{user.user.firstName}</span> */}
            </IconButton>{" "}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => changeTab("my-profile")}>
                My Profile
              </MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={"primary-search-account-menu-mobile"}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Fragment>
  );
};
export default connect(null, { logout })(Header);
