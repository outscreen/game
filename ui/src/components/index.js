'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');
const userActions = require('../actions/user');

const Header = require('../components/header');
const Login = require('../components/login');
const Profile = require('../components/profile');
const Reminder = require('../components/reminder');

const userHelpers = require('../helpers/user');

class Index extends React.Component {
    componentWillMount() {
        this.props.routeActions.clear();
        userHelpers.getData()
            .then((data) => this.props.userActions.userLoadSuccess(data))
            .catch(() => this.props.userActions.userLoadFailure());
    }

    isLoggedIn() {
        if (this.props.loggedIn) return true;
        this.props.routeActions.routeChange(this.props.username ? 'login' : 'register');
    }

    hasUsername() {
        if (this.props.username) return true;
        this.props.routeActions.routeChange('register');
    }

    render() {
        var MainComponent = '';

        switch (this.props.route) {
            case 'base':
                this.hasUsername() && (MainComponent = (<Profile/>));
                break;
            case 'login':
            case 'register':
                MainComponent = (<Login/>);
                break;
            case 'reminder':
                this.isLoggedIn() && (MainComponent = (<Reminder reminderId={this.props.selectedReminder}/>));
                break;
            default:
                console.error('Unknown route, reset state', this.props.route);
                // TODO reset state
                return;
        }

        return (
            <div className="hello">
                <Header username={this.props.username}/>
                {MainComponent}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    loggedIn: state.user.loggedIn,
    route: state.route.current,
    selectedReminder: state.reminder.selectedReminder,
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);
