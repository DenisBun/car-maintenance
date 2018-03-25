import React from 'react';
import Gallery from '../Common/ImageGallery/ImageGallery';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import './Car.css';


const Car = (props) => (
  props.car
  ? (
      <div className="carWrapper">
        <div className="carHeading">
          {props.car.heading}
        </div>
        <a className="buyCarBtn" href={props.car['vdp_url']}>Buy: {props.car.price} $</a>
        <ExpansionPanel style={{ marginBottom: '20px' }}>
              <ExpansionPanelSummary style={{ fontSize: '30px' }} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontSize: '30px' }}>Build</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ color: 'black', display: 'block', fontSize: '25px' }}>
                <div>Body type: {props.car.build['body_type']}</div>
                <div>Cylinders: {props.car.build.cylinders}</div>
                <div>Doors: {props.car.build.doors}</div>
                <div>Engine Size: {props.car.build['engine_size']}</div>
                <div>Fuel Type: {props.car.build['fuel_type']}</div>
                <div>Exterior Color: {props.car['exterior_color']}</div>
                <div>VIN: {props.car.vin}</div>
              </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel style={{ marginBottom: '20px' }}>
              <ExpansionPanelSummary style={{ fontSize: '30px' }} expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontSize: '30px' }}>Dealer</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ color: 'black', display: 'block', fontSize: '25px' }}>
                <div>Country: {props.car.dealer.country}</div>
                <div>City: {props.car.dealer.city}</div>
                <div>State: {props.car.dealer.state}</div>
                <div>Street: {props.car.dealer.street}</div>
                <div>ZIP: {props.car.dealer.zip}</div>
                <hr />
                <div>Name: {props.car.dealer.name}</div>
                <div>Phone: {props.car.dealer.phone}</div>
                <div>Website: {props.car.dealer.website}</div>
              </ExpansionPanelDetails>
          </ExpansionPanel>        
        {props.car.media['photo_links']
          ? <Gallery images={props.car.media['photo_links']} />
          : null
        }    
      </div> 
    )
    : null 
);
  

export default Car;
