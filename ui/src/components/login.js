'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
const InputGroup = require('react-bootstrap').InputGroup;
const FormControl = require('react-bootstrap').FormControl;
const Button = require('react-bootstrap').Button;

const validate = require('validate.js');

const routeActions = require('../actions/route');
const userActions = require('../actions/user');
const userHelpers = require('../helpers/user');

const validationRules = require('../../../core/validate/fields');

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username || '',
            password: this.props.password || '',
            formErrors: undefined,
        };

        this.getAction = () => (this.isRegister && userHelpers.create) || (this.isLogin && userHelpers.login);
        this.getActionSuccess = () => (this.isRegister && 'registerSuccess') || (this.isLogin && 'loginSuccess');
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        this.getAction()(this.state)
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

    handleChange(key) {
        return {
            value: this.state[key],
            onChange: (event) => {
                this.setState({[key]: event.target.value}, this.validate.bind(this));
            },
        };
    }

    validate() {
        this.setState({
            formErrors: validate(this.state, {
                username: validationRules.username,
                password: validationRules.password,
            })
        });
    }

    render() {
        this.isRegister = this.props.route === 'register';
        this.isLogin = this.props.route === 'login';

        return (
            <div className="form content">
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <InputGroup>
                        <InputGroup.Addon>Username</InputGroup.Addon>
                        <FormControl type="text" placeholder="username" {...this.handleChange('username')} />
                        { this.state.formErrors && this.state.formErrors.username && (
                            <p>{this.state.formErrors.username[0]}</p>) }
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Addon>Password</InputGroup.Addon>
                        <FormControl type="password" placeholder="password" {...this.handleChange('password')} />
                        { this.state.formErrors && this.state.formErrors.password && (
                            <p>{this.state.formErrors.password[0]}</p>) }
                    </InputGroup>

                    { this.props.error && (<p>{this.props.error}</p>) }

                    <Button
                        disabled={this.state.formErrors}
                        type="submit"
                        className="">
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
