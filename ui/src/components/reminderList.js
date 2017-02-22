'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const config = require('../../config');

const routeActions = require('../actions/route');
const reminderActions = require('../actions/reminder');
const reminderHelpers = require('../helpers/reminder');

class Profile extends React.Component {
    markRead(_id) {
        reminderHelpers.update({_id, status: config.status.read})
            .then(() => this.props.reminderActions.reminderRead(_id));
    }

    render() {
        const listItems = this.props.reminders
            .filter((item) => item.location === this.props.location)
            .sort((a, b) => a.dueDate > b.dueDate)
            .map((item) => (
                <li key={item._id}>
                    <a href="#">{item.description}</a>
                    <a href="#">Open</a>
                    <a href="#">Open & Mark Read</a>
                    <a href="#" onClick={this.markRead.bind(this, item._id)}>Mark Read</a>
                    <a href="#">Edit</a>
                </li>
            ));

        return (
            <div>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reminders: state.reminder.reminders,
    location: state.reminder.currentLocation
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
    reminderActions: bindActionCreators(reminderActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Profile);
