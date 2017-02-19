'use strict';


const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const DateTimePicker = require('react-widgets').DateTimePicker;

const routeActions = require('../actions/route');
const userActions = require('../actions/user');
const userHelpers = require('../helpers/user');

class Reminder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <DateTimePicker
                    defaultValue={new Date()}
                    value={this.state.day}
                    time={false}
                ></DateTimePicker>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.route.error,
});

const mapDispatchToProps = (dispatch) => ({
    userActions: bindActionCreators(userActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Reminder);