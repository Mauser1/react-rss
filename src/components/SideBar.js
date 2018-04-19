import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { SIDE_BAR_OPEN, SIDE_BAR_CLOSE } from '../constants/actionTypes';

class SideBar extends Component {
  static propTypes = {
    sideBar: PropTypes.bool.isRequired,
    /* eslint react/forbid-prop-types: 0 */
    menus: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    closeSideBar: PropTypes.func.isRequired,
    openSideBar: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
  };
  toggleSidebar() {
    if (this.props.sideBar) {
      this.props.closeSideBar();
    } else {
      this.props.openSideBar();
    }
  }
  render() {
    const styles = {
      header: {
        display: 'flex',
        flexFlow: 'column',
        textAlign: 'center',
        avatar: {
          margin: '0 auto',
        },
      },
    };
    return (
      <div>
        <Drawer
          width={200}
          open={this.props.sideBar}
          docked={false}
          onRequestChange={() => this.toggleSidebar()}
        >
          <div style={styles.header}>
            <Avatar
              style={styles.header.avatar}
              src={`${this.props.avatar}`}
              size={50}
            />
            <span>{this.props.username}</span>
          </div>
          <div>
            {this.props.menus.map(menu => (
              <MenuItem
              /* Todo:  add unique index */
                primaryText={menu.text}
                leftIcon={menu.icon}
                /* Todo: Add navigatable href */
                /* eslint-disable */
                onClick={()=>this.toggleSidebar()}
               containerElement={<Link to={menu.link} />}
                /* eslint-enable */
              />
            ))}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openSideBar: () => dispatch({ type: SIDE_BAR_OPEN }),
  closeSideBar: () => dispatch({ type: SIDE_BAR_CLOSE }),
});

const mapStateToProps = state => ({
  sideBar: state.ui.sideBar,
  avatar: state.common.currentUser.avatar,
  username: state.common.currentUser.username,
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
