import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import AutocompleteInput from '../Common/AutocompleteInut/AutocompleteInput';
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';
import Car from '../Car/Car';
import { CAR_SEARCH_API_URL, CAR_SEARCH_API_KEY, carSuggestions} from '../../config/carSearchApi';
import { searchCar } from '../../actions/buyCar/buyCar';


const mapStateToProps = state => ({
  isFetching: state.buyCar.isFetching,
  cars: state.buyCar.cars,
  initialPage: state.buyCar.pagination,
});
class BuyCar extends Component {

  state = {
    initialMessage: 'Nothing to display, search some cars first',
    //searchResults: [],
    make: '',
    model: '',
    pagination: {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currentPage: 1,
    },
    // currentCar: {},    
  }

  handleCarMakeChange = ({ target: { value } }) => {
    this.setState({ make: value });
  };

  handleCarModelChange = ({ target: { value } }) => {
    this.setState({ model: value });
  };

  handleSearch = () => {
    this.props.searchCar(`${CAR_SEARCH_API_URL}${CAR_SEARCH_API_KEY}${this.state.make && `make=${this.state.make}`}${this.state.model && `&model=${this.state.model}`}`);
  }

  setPage = (page) => {
    this.setState({ currentPage: page, currentCar:  this.props.cars[page - 1]})
  }

  render() {
    return (
      <div>
        {/* <AutocompleteInput
          placeholder="Input car make (Ford, Audi etc...)"
          suggestions={carSuggestions}
        /> */}
        <label className='inputLabel' htmlFor="carMake">
          Car make
        </label>
        <Input
          shrink
          fullWidth
          id="carMake"
          name="carMake"
          value={this.state.make}
          onChange={this.handleCarMakeChange}
          placeholder="Ford"
          marginBottom="30"
        />
        <label className='inputLabel' htmlFor="carYear">
          Car model
        </label>
        <Input
          shrink
          fullWidth
          id="carYear"
          name="carYear"
          value={this.state.model}
          onChange={this.handleCarModelChange}
          placeholder="Mustang"
          marginBottom="30"
        />
        <Button
          fullWidth
          className='searchCarBTn'
          onClick={this.handleSearch}
        >            
          Search Car!              
        </Button>
        {/* <div>{this.state.searchResults.length && this.state.initialMessage}</div> */}
        <div>
          {!this.props.isFetching
            ? this.state.currentCar
                ? <Car car={this.state.currentCar}/>
                : <Car car={this.props.cars[0]}/>
            : <CircularProgress style={{ color: 'purple' }} thickness={7} />
          }
        </div>
        <ul>
          {this.state.pagination.pages.map((page, index) => 
            <li key={index}>
              <a onClick={() => this.setPage(page)}>{page}</a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { searchCar }
)(BuyCar);