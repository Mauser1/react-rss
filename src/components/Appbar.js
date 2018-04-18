import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SIDE_BAR_OPEN, SIDE_BAR_CLOSE } from '../constants/actionTypes';


const mapStateToProps = state => ({
  sideBar: state.ui.sideBar,
});
const mapDispatchToProps = dispatch => ({
  openSideBar: () => dispatch({ type: SIDE_BAR_OPEN }),
  closeSideBar: () => dispatch({ type: SIDE_BAR_CLOSE }),
});
class Appbar extends Component {
  static propTypes = {
    openSideBar: PropTypes.func.isRequired,
    closeSideBar: PropTypes.func.isRequired,
    sideBar: PropTypes.bool.isRequired,
  }
  toggleSideBar() {
    if (this.props.sideBar) {
      this.props.closeSideBar();
    } else {
      this.props.openSideBar();
    }
  }
  render() {
    return (
      <div>
        <AppBar
          id="app-bar"
          title="RSS Reader"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={() => this.toggleSideBar()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
