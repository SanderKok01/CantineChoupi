import React from 'react';
import "./button_styles.scss";
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.color
    };
  };

  componentDidMount() {
    if (!this.props.color) {
      throw new Error("Color prop is required");
    } else {
      if (this.props.color === "white" || this.props.color === "black" || this.props.color === "primary" || this.props.color === "danger" ||
      this.props.color === "warning" || this.props.color === "success" || this.props.color === "success-light" ||
      this.props.color === "success-dark") {
        this.setState({
          color: this.props.color
        });
      } else {
        console.warn("No valid color is given in Button component.");

        this.setState({
          color: "white"
        });
      };
    };
  };

  render() {
    return (
      <React.Fragment>
        <button className={ this.props.classes ? `button__wrapper--${this.state.color} ${this.props.classes}` : `button__wrapper--${this.state.color}` } { ...this.props }>
          <span className={ `button__text--${this.state.color}` }>{ this.props.children }</span>
        </button>
      </React.Fragment>
    );
  };
};

export default Button;
