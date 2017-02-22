'use strict';


const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const DateTimePicker = require('react-widgets').DateTimePicker;
const SelectList = require('react-widgets').SelectList;

const config = require('../../config');
const reminderActions = require('../actions/reminder');
const reminderHelpers = require('../helpers/reminder');

class Reminder extends React.Component {
    constructor(props) {
        super(props);

        const reminder = this.props.reminders[this.props.reminderId];

        this.locationList = config.locationList;

        this.state = {
            url: reminder && reminder.url || '',
            _id: reminder && reminder._id || '',
            description: reminder && reminder.description || '',
            dueDate:  new Date(reminder && reminder.dueDate || Date.now() + 15 * 60 * 1000),
            location: reminder && reminder.location || config.defaultLocation,
        };
    }

    onSubmit() {
        (this.state._id ? reminderHelpers.update(this.state) : reminderHelpers.add(this.state))
            .then((reminder) => this.props.reminderActions.reminderSuccess(reminder));
    }

    handleChange(key) {
        return {
            value: this.state[key],
            onChange: (event) => {
                this.setState({ [key]: event.target.value });
            },
        };
    }

    validate() {
        //this.setState({ disableSubmit: !(this.state.username && this.state.password) });
    }

    render() {
        return (
            <div>
                <input {...this.handleChange('url')}
                       type="text"/>
                <input {...this.handleChange('description')}
                       type="text"/>
                <DateTimePicker
                    defaultValue={new Date()}
                    min={new Date()}
                    {...this.handleChange('dueDate')}
                />
                <SelectList value={this.state.location}
                            onChange={(l) => this.setState({ location: l.id })}
                            data={this.locationList}
                            valueField="id"
                            textField="name"
                />
                <button onClick={this.onSubmit.bind(this)}>OK</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.route.error,
    reminders: state.reminder.reminders,
});

const mapDispatchToProps = (dispatch) => ({
    reminderActions: bindActionCreators(reminderActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Reminder);