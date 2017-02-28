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
                <ReminderList/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Profile);
