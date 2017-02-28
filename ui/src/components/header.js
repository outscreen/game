'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');
const reminderActions = require('../actions/reminder');
const Location = require('./location');

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    addReminder() {
        this.props.routeActions.routeChange('reminder');
    }

    goHome() {
        this.props.routeActions.routeChange('base');
    }

    logout() {
    }

    changeLocation(location) {
        this.props.reminderActions.locationChanged(location);
    }

    render() {
        return (
            <div className="head table">
                <div className="cell"><a href="#" onClick={this.goHome.bind(this)}>
                    <i className="glyphicon glyphicon glyphicon-th-list"/></a></div>
                <div className="cell"><a href="#" onClick={this.addReminder.bind(this)}>
                    <i className="glyphicon glyphicon-plus-sign"/></a></div>

                <div className="cell align-center">
                    <Location action={this.changeLocation.bind(this)} location={this.props.location}></Location>
                </div>

                <div className="cell align-right"><a href="#" onClick={this.logout.bind(this)}>
                    <i className="glyphicon glyphicon-log-out"/></a></div>
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
