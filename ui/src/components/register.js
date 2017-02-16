'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');

class Register extends React.Component {
    showLogin() {
        this.props.route.goTo('login');
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={(e) => this.onSubmit(e, this.state)}>
                    <label><span>Username:</span></label>
                    <div>
                        <input
                            type="text"
                            placeholder={"User"}
                        />
                    </div>
                    <label><span>Password:</span></label>
                    <div>
                        <input
                            type="password"
                            placeholder={"Password"}
                        />
                    </div>
                </form>

                <a href="#" onClick={this.showLogin.bind(this)}>I have an account</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    route: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register);
