import React from 'react';
import "./textarea_styles.scss";

class Textarea extends React.Component {
  render() {
    if (!this.props.color) {
      throw new Error("Color prop expected");
    }

    if (!this.props.mandatory) {
      return (
        <div style={{ height: this.props.height, width: this.props.width }}
          className={ this.props.wrapperClasses ? `textarea-wrapper ${this.props.wrapperClasses}` : `textarea-wrapper` }
        >
          <label for={ this.props.name } className={ `textarea__label--${this.props.color}` }>{ `${this.props.label}:` }</label>
          <textarea name={ this.props.name } type={ this.props.type } placeholder={ this.props.label }
            value={ this.props.value } { ...this.props }
            className={ this.props.textareaClasses ? `textarea--${this.props.color} ${this.props.textareaClasses}` : `textarea--${this.props.color}` }
          >{ this.props.children }</textarea>
        </div>
      );
    } else {
      return (
        <div style={{ height: this.props.height, width: this.props.width }}
          className={ this.props.wrapperClasses ? `textarea-wrapper ${this.props.wrapperClasses}` : `textarea-wrapper` }
        >
          <span className="textarea-required">* required</span>
          <label for={ this.props.name } className={ `textarea__label--${this.props.color}` }>{ `${this.props.label}:` }</label>
          <textarea name={ this.props.name } type={ this.props.type } placeholder={ this.props.label }
            value={ this.props.value } { ...this.props }
            className={ this.props.textareaClasses ? `textarea--${this.props.color} ${this.props.textareaClasses}` : `textarea--${this.props.color}` }
          >{ this.props.children }</textarea>
        </div>
      );
    }
  };
};

export default Textarea;
