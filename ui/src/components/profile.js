'use strict';

const React = require('react');
const connect = require('react-redux').connect;

class Index extends React.Component {
    render() {
        return (
            <div className="form">
                PROFILE!
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

module.exports = connect(mapStateToProps)(Index);
