import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div className={ this.props.shown ? "modal modal-shown" : "modal modal-hidden" }>
        { this.props.children }
      </div>
    );
  };
};

export default Modal;
