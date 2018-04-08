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

import { HOST } from '../../config/fetchConfig';

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
  },
  table: {
    minWidth: 400,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class UpgradeCar extends React.Component {

  state = {
    cars: [],
    currentCar: '',
  };

  componentDidMount() {
    fetch(`${HOST}users/${this.props.userInfo.id}/cars`)
      .then(res => res.json())
      .then(({ cars }) => this.setState({ cars }))
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Header />
        <div>
          {
            this.state.cars.length
              ? (
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel htmlFor="cars">Select you car</InputLabel>
                  <Select
                    value={this.state.currentCar}
                    onChange={this.handleChange}
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
        </div>
        <div>
          <button>Add car</button>
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
              {data.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.calories}</TableCell>
                    <TableCell numeric>{n.fat}</TableCell>
                    <TableCell><button>Add to cart</button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>  
      </div>  
    );
  }
}

  

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UpgradeCar));