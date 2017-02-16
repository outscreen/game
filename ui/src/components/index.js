'use strict';

const React = require('react');
const connect = require('react-redux').connect;

const Register = require('../components/register');
const Header = require('../components/header');
const Login = require('../components/login');
const Profile = require('../components/profile');

const getState = require('../helpers/getState');

class Index extends React.Component {
    render() {
        var MainComponent;

        switch (this.props.route) {
            case 'base':
                MainComponent = this.props.username ? Profile : Register;
                break;
            case 'login':
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

module.exports = connect(mapStateToProps)(Index);
