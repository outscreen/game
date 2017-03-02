'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');
const userActions = require('../actions/user');
const reminderActions = require('../actions/reminder');
const userHelpers = require('../helpers/user');
const reminderHelpers = require('../helpers/reminder');

const config = require('../../config');

const Location = require('./location');

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    addReminder() {
        this.props.reminderActions.reminderSelected(null);
        this.props.routeActions.routeChange('reminder');
    }

    goHome() {
        this.props.routeActions.routeChange('base');
    }

    logout() {
        userHelpers.logout()
            .then(() => this.props.userActions.logoutSuccess())
            .catch((error) => {
                console.log('error', error);
                this.props.routeActions.actionFailure(error);
            });
    }

    login() {
        return this.props.routeActions.routeChange('login');
    }

    sync() {
        reminderHelpers.getByStatus(config.status.unread)
            .then((data) => this.props.reminderActions.remindersLoadSuccess(data))
            .catch((error) => {
                console.log('error', error);
                this.props.routeActions.actionFailure(error)
            });
    }

    changeLocation(location) {
        this.props.reminderActions.locationChanged(location);
    }

    render() {
        const loginBtn = this.props.loggedIn ? (
            <div className="cell align-right"><a href="#" onClick={this.logout.bind(this)}>
                {this.props.username} <i className="glyphicon glyphicon-log-out"/></a></div>
        ) : (
            <div className="cell align-right"><a href="#" onClick={this.login.bind(this)}>
                <i className="glyphicon glyphicon-log-in"/></a></div>
        );

        return (
            <div className="head table">
                <div className="cell"><a href="#" onClick={this.goHome.bind(this)}>
                    <i className="glyphicon glyphicon glyphicon-th-list"/></a></div>
                <div className="cell"><a href="#" onClick={this.addReminder.bind(this)}>
                    <i className="glyphicon glyphicon-plus-sign"/></a></div>

                <div className="cell align-center">
                    <Location action={this.changeLocation.bind(this)} location={this.props.location}></Location>
                </div>

                {this.props.loggedIn && <div className="cell align-right"><a href="#" onClick={this.sync.bind(this)}>
                    <i className="glyphicon glyphicon-refresh"/></a></div>}

                {loginBtn}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.reminder.currentLocation,
    username: state.user.username,
    loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    reminderActions: bindActionCreators(reminderActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);
