import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Header from '../Header/Header';
import { HOST } from '../../config/fetchConfig';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import CheckCircle from 'material-ui-icons/CheckCircle';

import './UserOrders.css';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    maxWidth: '500px',
    margin: '0 auto',
  }),
  progress: {
    margin: theme.spacing.unit * 2,
  },
  icon: {
    color: 'mediumseagreen',
    width: '55px',
    height: '55px',
  }
});

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
});

class UserOrders extends React.Component {

  state = {
    orders: [],
  };

  componentDidMount() {
    fetch(`${HOST}users/${this.props.userInfo.id}/order`)
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  };

  render() {
    return (
      <div className="userOrdersWrapper">
        <Header />
            {this.state.orders.map((order, index) => {
              return (
                <Paper key={index} className={this.props.classes.root} elevation={4}>
                  <Typography variant="headline" component="h3">
                    {order.carName + ' ' + order.registrationNumber}
                  </Typography>
                  <Typography component="p">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <p>{order.title}</p>
                        <p>{order.price} $</p>
                        <p>Created at: {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss')}</p>
                      </div>
                      {
                        order.status === 'IN_PROGRESS' &&
                          (
                            <div>
                              <CircularProgress className={this.props.classes.progress} />
                            </div> 
                          )
                      }
                      {
                        order.status === 'RESOLVED' &&
                          (
                            <div>
                              <CheckCircle className={this.props.classes.icon} />
                            </div> 
                          )
                      }  
                    </div>  

                  </Typography>
                </Paper>
              )
            })}
      </div> 
  
    );
  }
}; 
  

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserOrders));
