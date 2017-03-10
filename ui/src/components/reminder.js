'use strict';

const React = require('react');

const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const DateTimePicker = require('react-widgets').DateTimePicker;
const InputGroup = require('react-bootstrap').InputGroup;
const FormControl = require('react-bootstrap').FormControl;
const Button = require('react-bootstrap').Button;
const Location = require('./location');
const Form = require('./form');

const config = require('../../config');
const reminderActions = require('../actions/reminder');
const reminderHelpers = require('../helpers/reminder');


class Reminder extends Form {
    constructor(props) {
        super(props, ['url', 'description']);

        const reminder = this.props.reminders[this.props.reminderId];

        this.locationList = config.locationList;

        this.state = {
            url: reminder && reminder.url || '',
            _id: reminder && reminder._id || '',
            description: reminder && reminder.description || '',
            dueDate:  new Date(reminder && reminder.dueDate || Date.now() + 15 * 60 * 1000),
            location: reminder && reminder.location || config.defaultLocation,
        };

        if (!this.state._id && window.chrome.tabs) {
            window.chrome.tabs.getSelected((tab) => this.setState({
                url: tab.url,
                description: tab.title,
            }));
        }
    }

    onSubmit() {
        (this.state._id ? reminderHelpers.update(this.state) : reminderHelpers.add(this.state))
            .then((reminder) => this.props.reminderActions.reminderSuccess(reminder));
    }

    render() {
        return (
            <form className="content">
                <InputGroup>
                    <InputGroup.Addon className={this.getValidityClass('url')}>URL</InputGroup.Addon>
                    <FormControl type="text" placeholder="http://..." {...this.handleChange('url')} />
                </InputGroup>
                { this.getError('url') }

                <InputGroup>
                    <InputGroup.Addon className={this.getValidityClass('description')}>Description</InputGroup.Addon>
                    <FormControl type="text" placeholder="" {...this.handleChange('description')} />
                </InputGroup>
                { this.getError('description') }

                <InputGroup className="location margin-bottom">
                    <InputGroup.Addon>Location</InputGroup.Addon>
                    <Location action={(id) => this.setState({ location: id })} location={this.state.location}/>
                </InputGroup>

                <InputGroup className="margin-bottom">
                    <InputGroup.Addon>Due</InputGroup.Addon>
                    <DateTimePicker
                        defaultValue={new Date()}
                        min={new Date()}
                        {...this.handleChange('dueDate')}
                    />
                </InputGroup>

                <Button onClick={this.onSubmit.bind(this)} disabled={!!this.state.formErrors}>
                    { this.state._id ? 'Edit' : 'Add' } reminder
                </Button>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.route.error,
    reminders: state.reminder.reminders,
    reminderId: state.reminder.selectedReminder,
});

const mapDispatchToProps = (dispatch) => ({
    reminderActions: bindActionCreators(reminderActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Reminder);