import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import './UpgradeCar.css';

import { handleUserOrders } from '../../actions/user/user';
import { HOST, parseBody, headers } from '../../config/fetchConfig';

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  tableWrapper: {
    width: '800px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: '0 auto',
  },
  table: {
    minWidth: 400,
  },
});

class UpgradeCar extends React.Component {

  state = {
    cars: [],
    maintenance: [],
    currentCar: '',
    carName: '',
    carRegistrationNumber: '',
    userOrders: [],
  };

  componentDidMount() {
    fetch(`${HOST}users/${this.props.userInfo.id}/cars`)
      .then(res => res.json())
      .then(({ cars }) => this.setState({ cars }));

    fetch(`${HOST}maintenance/upgrade`)
      .then(res => res.json())
      .then(({ maintenance }) => this.setState({ maintenance }));  
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUserOrders = order => this.setState({ userOrders: [...this.state.userOrders, order] });

  handleMakeOrder = () => {
    fetch(`${HOST}users/${this.props.userInfo.id}/order`, {
      method: 'POST',
      headers,
      body: parseBody(this.state.userOrders),
    })
    .then(() => {
      this.props.handleUserOrders(this.state.userOrders)
    })
    .then(() => this.props.history.push(`/Orders/${this.props.userInfo.id}`))
    
  };

  addNewCar = newCar => {
    if (!(this.state.carName || this.state.carRegistrationNumber)) return;
    fetch(`${HOST}users/${this.props.userInfo.id}/car`, {
      method: 'POST',
      headers,
      body: parseBody({ ...newCar, userId: this.props.userInfo.id }),
    })
    .then(() => this.setState({ 
      cars: [...this.state.cars, {...newCar, userId: this.props.userInfo.id }],
      carName: '',
      carRegistrationNumber: '',
    }))
  };

  // removeItemFromOrder = (maintenanceId, carId) => {
  //   this.setState({
  //     userOrders: [this.state.userOrders.filter(order => order.maintenanceId !== maintenanceId && order.car !== carId)]
  //   })
  //   console.log(this.state.userOrders);
  // };

  render() {
    return (
      <div className="upgradeCarWrapper">
        <Header />
        <div className="carsWrapper">
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '30px' }}>
              Choose car to upgrade
          </div>
          {
            this.state.cars.length
              ? (
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel style={{ color: 'white' }} htmlFor="cars">Select you car</InputLabel>
                  <Select
                    value={this.state.currentCar}
                    onChange={this.handleChange}
                    style={{ color: 'white' }}
                    inputProps={{
                      name: 'currentCar',
                      id: 'cars',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.state.cars.map(({ carName, registrationNumber}) => (
                      <MenuItem key={registrationNumber} value={carName}>{carName} : {registrationNumber}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
              : <div>You dont have any cars registered to our system yet, please add one</div>
          }
          <div>
            <ExpansionPanel style={{ marginBottom: '20px' }}>
              <ExpansionPanelSummary style={{ color: 'black' }} expandIcon={<ExpandMoreIcon />}>
                Add a new car
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ flexDirection: 'column' }}>                
              <label className='inputLabel' htmlFor="carName">
                  Car Name
                </label>
                <Input
                  shrink
                  fullWidth
                  min="1"
                  type="text"
                  id="carName"
                  name="carName"
                  placeholder="Nissan"
                  value={this.state.carName}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                <label className='inputLabel' htmlFor="carRegistrationNumber">
                  Car Registration Number
                </label>
                <Input
                  shrink
                  fullWidth
                  min="1"
                  type="text"
                  id="carRegistrationNumber"
                  name="carRegistrationNumber"
                  placeholder="HT5555-I3"
                  value={this.state.carRegistrationNumber}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                <Button
                  onClick={() => this.addNewCar({ carName: this.state.carName, registrationNumber: this.state.carRegistrationNumber })}
                >
                  Add car
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
        <div className="priceListWrapper">
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '30px' }}>
            Price List
          </div>  
          <Paper className={this.props.classes.tableWrapper}>
            <Table className={this.props.classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Maintenance Type</TableCell>
                  <TableCell numeric>Price ($)</TableCell>
                  <TableCell numeric>Upgrade/repair duration (hours)</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.maintenance.map(n => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell>{n.title}</TableCell>
                      <TableCell numeric>{n.price}</TableCell>
                      <TableCell numeric>12</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => this.handleUserOrders(
                            { carName: this.state.currentCar, carId: this.state.cars.filter(({ carName }) => this.state.currentCar === carName)[0].id, maintenanceId: n.id, maintenanceTitle: n.title, maintenancePrice: n.price}
                          )}
                        >
                          Add to cart
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <div>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '30px' }}>
              Your orders
          </div>
          {
            this.state.userOrders.length
              ? (
                <div>
                  <Paper className={this.props.classes.tableWrapper}>
                  <Table className={this.props.classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Car to upgrade</TableCell>
                        <TableCell numeric>Maintenance Type</TableCell>
                        <TableCell numeric>Price ($)</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.userOrders.map(order => {
                        return (
                          <TableRow key={order.maintenanceId}>
                            <TableCell>{ this.state.cars.filter(({ id }) => order.carId === id)[0].carName || ''}</TableCell>
                            <TableCell numeric>{order.maintenanceTitle}</TableCell>
                            <TableCell numeric>{order.maintenancePrice}</TableCell>
                            <TableCell>
                              <Button>
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <span style={{ fontSize: '30px', marginRight: '10px' }}>
                    {`Total price: ${
                      this.state.userOrders.map(order => order.maintenancePrice)
                        .reduce((sum, current) => sum + current)
                      } $`} 
                  </span>
                  <Button colorConfig="GREEN" onClick={() => this.handleMakeOrder()}>Make an order</Button>    
                </div>  
              </div>
              )
              : <div style={{ textAlign: 'center' }}>No new orders yet</div>
          }
        </div>  
      </div>  
    );
  }
}

  

export default connect(
  mapStateToProps,
  { handleUserOrders }
)(withStyles(styles)(UpgradeCar));