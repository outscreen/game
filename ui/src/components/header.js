'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const SelectList = require('react-widgets').SelectList;

const config = require('../../config');

const routeActions = require('../actions/route');
const reminderActions = require('../actions/reminder');

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.locationList = config.locationList;
    }

    goHome() {
        this.props.routeActions.routeChange('base');
    }

    logout() {}

    changeLocation(location) {
        this.props.reminderActions.locationChanged(location);
    }

    render() {
        return (
            <div className="head">
                <a href="#" onClick={this.goHome.bind(this)}>Home</a>
                <SelectList value={this.props.location}
                            onChange={(l) => this.changeLocation(l.id)}
                            data={this.locationList}
                            valueField="id"
                            textField="name"
                />
                <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                <p>HEADER</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.reminder.currentLocation,
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
    reminderActions: bindActionCreators(reminderActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);
