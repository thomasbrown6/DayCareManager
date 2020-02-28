import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function Totals(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h4">
        {formatter.format(props.amount)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {moment(props.date).format("DD MMMM, YYYY")}
      </Typography>
      <div>
        <Link color="text-primary" to={props.link} className="underline">
          View more
        </Link>
      </div>
    </React.Fragment>
  );
}
