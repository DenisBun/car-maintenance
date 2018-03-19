import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

const  UserContent = (props) => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://cf-img.autorevo.com/2014-ford-mustang-gower-mo-6364302/640x640/2007299-20-revo.jpg?_=1518187887"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Buy car
          </Typography>
          <Typography component="p">
            Buy a new car with our modern car search API.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Get in!
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}


export default withStyles(styles)(UserContent);