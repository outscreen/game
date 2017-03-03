'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const InputGroup = require('react-bootstrap').InputGroup;
const FormControl = require('react-bootstrap').FormControl;
const Button = require('react-bootstrap').Button;
const Form = require('./form');

const routeActions = require('../actions/route');
const userActions = require('../actions/user');
const userHelpers = require('../helpers/user');


class Login extends Form {
    constructor(props) {
        super(props, ['username', 'password']);

        this.state = {
            username: this.props.username || '',
            password: this.props.password || '',
        };

        this.getAction = () => (this.isRegister && userHelpers.create) || (this.isLogin && userHelpers.login);
        this.getActionSuccess = () => (this.isRegister && 'registerSuccess') || (this.isLogin && 'loginSuccess');
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        this.getAction()({
            username: this.state.username,
            password: this.state.password,
        })
            .then((data) => this.props.userActions[this.getActionSuccess()](data))
            .catch((error) => {
                console.log('error', error);
                this.props.routeActions.actionFailure(error)
            });

        return false;
    }

    showRegistration() {
        this.props.routeActions.routeChange('register');
    }

    showLogin() {
        this.props.routeActions.routeChange('login');
    }

    render() {
        this.isRegister = this.props.route === 'register';
        this.isLogin = this.props.route === 'login';

        return (
            <div className="form content">
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <InputGroup>
                        <InputGroup.Addon className={this.getValidityClass('username')}>Username</InputGroup.Addon>
                        <FormControl type="text" placeholder="username" {...this.handleChange('username')} />
                    </InputGroup>
                    { this.getError('username') }

                    <InputGroup>
                        <InputGroup.Addon className={this.getValidityClass('password')}>Password</InputGroup.Addon>
                        <FormControl type="password" placeholder="password" {...this.handleChange('password')} />
                    </InputGroup>
                    { this.getError('password') }

                    { this.props.error && (<p>{this.props.error}</p>) }

                    <Button
                        disabled={!!this.state.formErrors}
                        type="submit"
                        bsStyle="primary" block>
                        OK
                    </Button>
                </form>
                { this.isLogin && (<a href="#" onClick={this.showRegistration.bind(this)}>Create new account</a>)}
                { this.isRegister && (<a href="#" onClick={this.showLogin.bind(this)}>I have an account</a>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.route.error,
    route: state.route.current,
});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
