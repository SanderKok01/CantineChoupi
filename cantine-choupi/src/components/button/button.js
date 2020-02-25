import React from 'react';
import "./button_styles.scss";

class Button extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button className="button">
          <span className="button__text--red">{ this.props.children }</span>
        </button>
      </React.Fragment>
    );
  }
}

export default Button;
