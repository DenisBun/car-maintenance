
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import Menu, { MenuItem } from 'material-ui/Menu';
import './Header.css';
import Button from '../Common/Button/Button';
import { isLoggedIn } from '../../utils/utils';
import { logoutUser } from '../../actions/user/user';


const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#35312e',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  state = {
    anchorUser: null,
  };

  handleMenu = event => {
    this.setState({ anchorUser: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorUser: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorUser } = this.state;
    const openUser = Boolean(anchorUser);

    return (
      <div>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/" className="pulse" style={{ textDecoration: 'none', color: 'white' }}>Car<span>Manager</span></Link>
              { isLoggedIn() && <Link to="/BuyCar">Buy car</Link> }
            </Typography>
            {isLoggedIn()
              ? (<div>
                  <IconButton
                    aria-owns={openUser ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={openUser}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={() => { 
                      this.handleClose();
                      this.props.logoutUser();
                      this.props.history.push('/');
                      }}>
                      Log out
                    </MenuItem>
                  </Menu>
                </div>)
              : (<ul style={{ display: 'flex', alignItems: 'center' }}>
                  {!this.props.isLoginPage &&
                    <Link to="/Login" style={{ textDecoration: 'none', color: 'white', fontFamily: 'Oswald, sans-serif', fontSize: '1.3125rem', fontWeight: 500 }}>
                      Login
                    </Link>
                  }
                  {!this.props.isRegistrationPage &&
                    <Link to="/Registration" style={{ textDecoration: 'none', marginLeft: '20px' }}>
                      <Button>Sign up</Button>
                    </Link>
                  }
                </ul>)              
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



export default connect(
  null, 
  { logoutUser }
)(withStyles(styles)(Header));

