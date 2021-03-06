import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    display: "flex",
    minHeight: "241px"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
});

const DaycarePost = ({ daycare }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href="#">
        <Card className={`${classes.card} tricary`}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {daycare.company}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {daycare.location}
              </Typography>
              <Typography variant="subtitle1" color="primary" paragraph>
                <Link className="link" to="/classrooms">
                  Classrooms: {daycare.classrooms.length}
                </Link>
              </Typography>
              <Typography variant="subtitle1" color="primary" paragraph>
                <Link className="link" to="/students">
                  Students: {daycare.studentcount}
                </Link>
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              // image={post.image}
              // title={post.imageTitle}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

DaycarePost.propTypes = {
  post: PropTypes.object
};

export default DaycarePost;
