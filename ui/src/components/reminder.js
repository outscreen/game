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

        this.locationList = config.locationList;

        this.state = {
            url: this.props.url || '',
            _id: this.props._id || '',
            description: this.props.description || '',
            dueDate: this.props.dueDate || new Date(Date.now() + 15 * 60 * 1000),
            location: this.props.location || config.defaultLocation,
        };
    }

    onSubmit() {
        reminderHelpers.add(this.state);
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
});

const mapDispatchToProps = (dispatch) => ({
    reminderActions: bindActionCreators(reminderActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Reminder);