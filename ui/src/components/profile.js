'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const Button = require('react-bootstrap').Button;

const ReminderList = require('./reminderList');

const routeActions = require('../actions/route');

class Profile extends React.Component {
    render() {
        return (
            <div className="content">
                { !this.props.loggedIn && (<div className="alert alert-warning" role="alert">
                    You are getting cached results.&nbsp;
                    <a href="#" onClick={this.props.routeActions.routeChange.bind(this,'login')}>
                        Login</a> to synchronize.
                </div>) }
                <ReminderList/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Profile);
