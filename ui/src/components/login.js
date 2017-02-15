'use strict';

const React = require('react');
const connect = require('react-redux').connect;

class Index extends React.Component {
    render() {
        return (
            <div className="form">
                <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

module.exports = connect(mapStateToProps)(Index);
