import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: "#43a047"
  },
  error: {
    backgroundColor: "#d32f2f"
  },
  info: {
    backgroundColor: "#1976d2"
  },
  // warning: {
  //   backgroundColor: amber[700],
  // },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

export const SnackBar = props => {
  const classes = useStyles();
  const { message, open, variant } = props;
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => props.onClose()}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        // message={<span id="message-id">Note archived</span>}
        // action={[
        //   <IconButton
        //     key="close"
        //     aria-label="close"
        //     color="inherit"
        //     className={classes.close}
        //     onClick={handleClose}
        //   >
        //     <CloseIcon />
        //   </IconButton>
        // ]}
      >
        <SnackbarContent
          className={classes[variant]}
          aria-describedby="client-snackbar"
          message={<span>{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => props.onClose()}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </Fragment>
  );
};
