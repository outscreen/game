'use strict';

const React = require('react');
const connect = require('react-redux').connect;

class Index extends React.Component {
    render() {
        return (
            <div className="head">
                <p>HEADER</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

module.exports = connect(mapStateToProps)(Index);
