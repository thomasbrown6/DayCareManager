import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  }
}));

const FixedList = props => {
  return (
    <FixedSizeList
      height={props.height}
      width={props.width}
      itemSize={props.itemSize}
      itemCount={props.itemCount}
    >
      {props.children}
    </FixedSizeList>
  );
};

export default FixedList;
