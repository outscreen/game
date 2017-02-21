'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');

const Header = require('../components/header');
const Login = require('../components/login');
const Profile = require('../components/profile');
const Reminder = require('../components/reminder');

const userHelpers = require('../helpers/user');

class Index extends React.Component {
    componentWillMount() {
        this.props.routeActions.clear();
        userHelpers.getData()
            .then((data) => this.props.routeActions.stateLoaded(data))
            .catch(() => {
                if (!this.props.username) {
                    return this.props.routeActions.routeChange('register');
                }
            });
    }

    render() {
        var MainComponent;

        switch (this.props.route) {
            case 'base':
                MainComponent = Profile;
                break;
            case 'login':
            case 'register':
                MainComponent = Login;
                break;
            case 'reminder':
                MainComponent = Reminder;
                break;
            default:
                console.error('Unknown route, reset state', this.props.route);
                // TODO reset state
                return;
        }

        return (
            <div className="hello">
                <Header username={this.props.username}/>
                <MainComponent/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    route: state.route.current,
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);
