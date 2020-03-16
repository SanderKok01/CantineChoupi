import React from 'react';
import "./input_styles.scss";

class Input extends React.Component {
  render() {
    if (!this.props.color) {
      throw new Error("Color prop expected");
    }

    if (!this.props.type) {
      throw new Error("Input requires type");
    }

    if (!this.props.mandatory) {
      return (
        <div className={ this.props.wrapperClasses ? `input-wrapper ${this.props.wrapperClasses}` : `input-wrapper` }>
          <label for={ this.props.name } className={ `input__label--${this.props.color}` }>{ `${this.props.label}:` }</label>
          <input name={ this.props.name } type={ this.props.type } placeholder={ this.props.label }
            value={ this.props.value } autocomplete="off" autocorrect="off" { ...this.props }
            className={ this.props.inputClasses ? `input--${this.props.color} ${this.props.inputClasses}` : `input--${this.props.color}` }
          />
        </div>
      );
    } else {
      return (
        <div className={ this.props.wrapperClasses ? `input-wrapper ${this.props.wrapperClasses}` : `input-wrapper` }>
          <span className="input-required">* required</span>
          <label for={ this.props.name } className={ `input__label--${this.props.color}` }>{ `${this.props.label}:` }</label>
          <input name={ this.props.name } type={ this.props.type } placeholder={ this.props.label }
            value={ this.props.value } autocomplete="off" autocorrect="off" { ...this.props }
            className={ this.props.inputClasses ? `input--${this.props.color} ${this.props.inputClasses}` : `input--${this.props.color}` }
          />
        </div>
      );
    }
  };
};

export default Input;
