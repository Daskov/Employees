import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";

const AlertDialog = ({ title, text, buttonText, handleClick }) => {
  const { popUp } = useSelector(({ userSlice }) => userSlice);

  return (
    <div>
      <Dialog
        open={popUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>{buttonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
