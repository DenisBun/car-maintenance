import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';
import Spinner from '../Common/Spinner/Spinner';
import Car from '../Car/Car';
import Header from '../Header/Header';
import { CAR_SEARCH_API_URL, CAR_SEARCH_API_KEY } from '../../config/carSearchApi';
import { searchCar } from '../../actions/buyCar/buyCar';
import './BuyCar.css';


const mapStateToProps = state => ({
  isFetching: state.buyCar.isFetching,
  cars: state.buyCar.cars,
  initialPage: state.buyCar.pagination,
  showPagination: state.buyCar.showPagination,
});
class BuyCar extends Component {

  state = {
    initialMessage: 'Nothing to display, search some cars first',
    //searchResults: [],
    searchDetails: {
      make: '',
      model: '',
      year: '',
      condition: '',
    },
    pagination: {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      currentPage: 1,
    },
    // currentCar: {},
    showAdvancedSearch: false,    
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ searchDetails: {...this.state.searchDetails, [name]:value} });
  };

  handleSearch = () => {
    let searchParams = ''; 
    Object.keys(this.state.searchDetails)
      .map(key => this.state.searchDetails[key] && (searchParams = searchParams.concat(`${key}=${this.state.searchDetails[key]}&`)))
    console.log(searchParams);  
    this.props.searchCar(`${CAR_SEARCH_API_URL}${CAR_SEARCH_API_KEY}${searchParams.slice(0, -1)}`)
  }

  setPage = (page) => {
    this.setState({ currentPage: page, currentCar:  this.props.cars[page - 1]})
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="buyCarWrapper">
          <div className="buyCarForm">
            <label className='inputLabel' htmlFor="make">
              Car make
            </label>
            <Input
              shrink
              fullWidth
              id="make"
              name="make"
              value={this.state.searchDetails.make}
              onChange={this.handleChange}
              placeholder="Ford"
              marginBottom="5"
            />
            <label className='inputLabel' htmlFor="model">
              Car model
            </label>
            <Input
              shrink
              fullWidth
              id="model"
              name="model"
              value={this.state.searchDetails.model}
              onChange={this.handleChange}
              placeholder="Mustang"
              marginBottom="5"
            />
            <label className='inputLabel' htmlFor="year">
              Car year
            </label>
            <Input
              shrink
              fullWidth
              id="year"
              name="year"
              value={this.state.searchDetails.year}
              onChange={this.handleChange}
              placeholder="2015"
              marginBottom="5"
            />
            <ExpansionPanel style={{ marginBottom: '20px' }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Expanded Search</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>                
                  <FormControl>
                    <InputLabel htmlFor="age-simple">Age</InputLabel>
                    <Select
                      value={this.state.searchDetails.condition}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'condition',
                        id: 'condition',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'new'}>New</MenuItem>
                      <MenuItem value={'used'}>Used</MenuItem>
                      <MenuItem value={'certified'}>Certified</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <label className='inputLabel' htmlFor="year">
                    Car year
                  </label>
                  <Input
                    shrink
                    fullWidth
                    id="year"
                    name="year"
                    value={this.state.searchDetails.year}
                    onChange={this.handleChange}
                    placeholder="2015"
                    marginBottom="5"
                  /> */}
                
              </ExpansionPanelDetails>
          </ExpansionPanel>  
            <Button
              fullWidth
              className='searchCarBTn'
              onClick={this.handleSearch}
            >            
              Search Car!              
            </Button>
          </div>
          {/* <div>{this.state.searchResults.length && this.state.initialMessage}</div> */}
          <div>
            {!this.props.isFetching
              ? this.state.currentCar
                  ? <Car car={this.state.currentCar} />
                  : <Car car={this.props.cars[0]} />
              : <Spinner />
            }
          </div>
          <div className="paginationWrapper">
            {this.props.showPagination && this.state.pagination.pages.map((page, index) => 
              <div className="paginationBtn" key={index} onClick={() => {this.setPage(page); this.setState({ currentPage: page })}}>
                {page}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  { searchCar }
)(BuyCar);