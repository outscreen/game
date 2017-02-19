'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');

class Profile extends React.Component {
    addReminder() {
        this.props.routeActions.routeChange('reminder');
    }

    render() {
        return (
            <div>
                PROFILE!
                <a href="#" onClick={this.addReminder.bind(this)}>Add reminder</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Profile);
