import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { SIDE_BAR_OPEN, SIDE_BAR_CLOSE } from '../constants/actionTypes';


const dummyAvatar = 'https://firebasestorage.googleapis.com/v0/b/rss-reader-1.appspot.com/o/user.png?alt=media&token=473e0481-453d-45c3-95a6-ed53d7544d40';
class SideBar extends Component {
  static propTypes = {
    sideBar: PropTypes.bool.isRequired,
    /* eslint react/forbid-prop-types: 0 */
    menus: PropTypes.array.isRequired,
    closeSideBar: PropTypes.func.isRequired,
    openSideBar: PropTypes.func.isRequired,
    username: PropTypes.string,
    avatar: PropTypes.string,
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
              src={`${this.props.avatar}` || dummyAvatar}
              size={50}
            />
            <span>{this.props.username || 'None'}</span>
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
