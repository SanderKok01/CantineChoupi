import React from 'react';
import "./button_styles.scss";

class Button extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button className="button_red">
          <span className="button_red_text">{ this.props.children }</span>
        </button>
      </React.Fragment>
    );
  }
}

export default Button;
