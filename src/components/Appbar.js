import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openSideBar, closeSideBar } from '../actions';


const mapStateToProps = state => ({
  sideBar: state.ui.sideBar,
});
const mapDispatchToProps = dispatch => ({
  openSideBar: () => dispatch(openSideBar()),
  closeSideBar: () => dispatch(closeSideBar()),
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
          titleStyle={{ fontSize: 18 }}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={() => this.toggleSideBar()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
