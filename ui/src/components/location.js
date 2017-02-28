'use strict';

const React = require('react');
const connect = require('react-redux').connect;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const Button = require('react-bootstrap').Button;

const config = require('../../config');

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.locationList = config.locationList;
    }

    render() {
        const locationButtons = this.locationList.map((location, index) => {
            return (
                <Button key={index}
                        onClick={() => this.props.action(location.id)}
                        className={location.id === this.props.location && "btn-success"}>
                    {location.name}
                </Button>
            )
        });

        return (
            <ButtonGroup className="location">
                {locationButtons}
            </ButtonGroup>
        );
    }
}

module.exports = connect()(Location);
