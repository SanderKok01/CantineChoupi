import React from 'react';
import "./shoppingcart_styles.scss";
import Button from '../button/button';

class Shoppingcart extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="shopping-cart">
            <div className="shopping-cart-header">
              <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">3</span>
              <div className="shopping-cart-total">
                <span className="lighter-text">Total:</span>
                <span className="main-color-text">$2,229.97</span>
              </div>
            </div>
            <ul className="shopping-cart-items">
              <li className="clearfix">
                <span className="item-name">Sony DSC-RX100M III</span>
                <span className="item-price">$849.99</span>
                <span className="item-quantity">Quantity: <span className="item-amount">01</span></span>
              </li>
              <li className="clearfix">
              </li>
              <li className="clearfix">
              </li>
            </ul>
            <Button color="primary">Checkout</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Shoppingcart;
