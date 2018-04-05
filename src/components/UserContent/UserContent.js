import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import BuyCarImg from './img/car.png';
import RepairCarImg from './img/hammer-and-wrench.png';
import UpgradeCarImg from './img/tachometer.png';
import './UserContent.css';

const styles = {
  card: {
    width: 450,
    margin: '10px',
  },
  media: {
    height: 450,
  },
};

const content = [
  {
    title: 'Buy car',
    subtitle: 'Buy a new car with our modern car search API.',
    image: BuyCarImg,
    actionBtn: 'Lets get in!',
    actionBtnLink: '/BuyCar',
    infoBtn: 'Learn More'
  },
  {
    title: 'Updrage car',
    subtitle: 'Updrage some parts of your car.',
    image: UpgradeCarImg,
    actionBtn: 'Upgrade my car!',
    actionBtnLink: '/UpgradeCar',
    infoBtn: 'Learn More'
  },
  {
    title: 'Repair car',
    subtitle: 'Fast and reliable car repairs.',
    image: RepairCarImg,
    actionBtn: 'Repair!',
    actionBtnLink: '/RepairCar',
    infoBtn: 'Learn More'
  },
]

const  UserContent = (props) => {
  const { classes } = props;
  return (
    <div className="userContentWrapper">
      {content.map((el, index) => {
        return (
          <Card className={classes.card} key={index}>
            <figure className="imghvr-shutter-in-horiz"> 
              <CardMedia
                className={classes.media}
                image={el.image}
                title={el.title}
              />
              <figcaption onClick={() => {props.history.push(el.actionBtnLink)}}>
                {el.title}
              </figcaption>
            </figure>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {el.title}
              </Typography>
              <Typography component="p">
                {el.subtitle}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => {props.history.push(el.actionBtnLink)}}>
                {el.actionBtn}
              </Button>
              <Button size="small" color="primary">
                {el.infoBtn}
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </div>
  );
}


export default withStyles(styles)(UserContent);