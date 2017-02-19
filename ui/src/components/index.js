'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');

const Header = require('../components/header');
const Login = require('../components/login');
const Profile = require('../components/profile');

const getState = require('../helpers/getState');

class Index extends React.Component {
    componentWillMount() {
        this.props.routeActions.clear();
        if (!this.props.username) {
            this.props.routeActions.routeChange('register');
        }
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
            default:
                console.error('Unknown route, reset state');
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
    username: state.auth.username,
    route: state.route.current,
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);
