// get user id via history params
// fetch all maintenance types and display them somehow
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';

import './UserOrders.css';

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
});

const UserOrders = props => (
    <div className="userOrdersWrapper">
      <Header />
      {/* <ExpansionPanel style={{ marginBottom: '20px' }}>
        <ExpansionPanelSummary style={{ color: 'black' }} expandIcon={<ExpandMoreIcon />}>
          Your car upgrades orders
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>                 */}
          {props.userInfo.orders.map((order, index) => {
            return (
              <div key={index}>
                {order.carName + ' ' + order.maintenanceTitle + ' ' + order.maintenancePrice}
              </div>  
            )
          })}
        {/* </ExpansionPanelDetails>
      </ExpansionPanel> */}
    </div> 

);
  

export default connect(
  mapStateToProps,
  null
)(UserOrders);
