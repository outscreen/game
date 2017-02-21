'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');

class Profile extends React.Component {
    render() {
        const listItems = this.props.reminders.map(function(item) {
            return (
                <li key={item._id}>
                    <a href="#">{item.description}</a>
                </li>
            );
        });

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
    reminders: state.reminder.reminders
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Profile);
