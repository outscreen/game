'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;

const config = require('../../config');

const routeActions = require('../actions/route');
const reminderActions = require('../actions/reminder');
const reminderHelpers = require('../helpers/reminder');

class Profile extends React.Component {
    constructor(props) {
        super(props);

        reminderHelpers.getByStatus(config.status.unread)
            .then((data) => this.props.reminderActions.remindersLoadSuccess(data))
            .catch((error) => {
                console.log('error', error);
                if (error.status === 401) return;
                this.props.routeActions.actionFailure('Failed to load reminders. Showing cached data.')
            });
    }

    markRead(_id, e) {
        e.preventDefault();
        e.stopPropagation();

        reminderHelpers.update({_id, status: config.status.read})
            .then(() => this.props.reminderActions.reminderRead(_id));

        return false;
    }

    edit(_id, e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.reminderActions.reminderSelected(_id);
        this.props.routeActions.routeChange('reminder');

        return false;
    }

    open(item, e) {
        e.preventDefault();
        e.stopPropagation();

        window.open(item.url);

        return false;
    }

    render() {
        const listItems = Object.values(this.props.reminders)
            .filter((item) => item.location === this.props.location)
            .sort((a, b) => a.dueDate > b.dueDate)
            .map((item) => (
                <ListGroupItem key={item._id} onClick={this.open.bind(this, item)}>
                    <span className="cell wide">{item.description}</span>
                    <a href="#" className="cell" onClick={this.open.bind(this, item)}>
                        <i className="glyphicon glyphicon-share"/></a>
                    <a href="#" className="cell"
                       onClick={this.open.bind(this, item._id) && this.markRead.bind(this, item._id)}>
                        <i className="glyphicon glyphicon-check"/></a>
                    <a href="#" className="cell" onClick={this.markRead.bind(this, item._id)}>
                        <i className="glyphicon glyphicon-ok"/></a>
                    <a href="#" className="cell" onClick={this.edit.bind(this, item._id)}>
                        <i className="glyphicon glyphicon-pencil"/></a>
                </ListGroupItem>
            ));

        return (
            <ListGroup className="reminder-list">
                {listItems.length ? listItems : (<div className="alert alert-success" role="alert">
                    You have no unread reminders</div>)}
            </ListGroup>
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
