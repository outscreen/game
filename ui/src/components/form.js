'use strict';

const React = require('react');

const validationRules = require('../../../core/validate/fields');
const validate = require('validate.js');

class Form extends React.Component {
    constructor(props, fieldsToValidate) {
        super(props);
        this.state = {};
        this.validationConfig = {};
        fieldsToValidate.forEach((fieldName) => this.validationConfig[fieldName] = validationRules[fieldName]);
    }

    handleChange(key) {
        return {
            value: this.state[key],
            onChange: (event) => {
                const value = event.target && event.target.value || event;
                this.setState({
                    [key]: value,
                    [`${key}Touched`]: true,
                }, this.validate.bind(this));
            },
        };
    }

    validate() {
        this.setState({
            formErrors: validate(this.state, this.validationConfig)
        });
    }

    getError(key) {
        const error = this.state[`${key}Touched`] && this.state.formErrors && this.state.formErrors[key] && (
                <p className="input-error">* {this.state.formErrors[key][0]}</p>);
        return error || (<p className="input-error invisible">Empty</p>);
    }

    getValidityClass(key) {
        if (!this.state[`${key}Touched`]) return 'pristine';
        if (this.state.formErrors && this.state.formErrors[key] && this.state.formErrors[key][0]) return 'invalid';
        return 'valid';
    }
}

module.exports = Form;