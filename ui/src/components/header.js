'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;

const routeActions = require('../actions/route');

class Index extends React.Component {
    goHome() {
        this.props.routeActions.routeChange('base');
    }

    render() {
        return (
            <div className="head">
                <a href="#" onClick={this.goHome.bind(this)}>Home</a>
                <p>HEADER</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    routeActions: bindActionCreators(routeActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);
