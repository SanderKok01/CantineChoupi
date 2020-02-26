import React from 'react';
import "./shoppingcart_styles.scss";

class Shoppingcart extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="container">
        <div class="shopping-cart">
          <div class="shopping-cart-header">
            <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">3</span>
            <div class="shopping-cart-total">
              <span class="lighter-text">Total:</span>
              <span class="main-color-text">$2,229.97</span>
            </div>
          </div>
          <ul class="shopping-cart-items">
            <li class="clearfix">
              <span class="item-name">Sony DSC-RX100M III</span>
              <span class="item-price">$849.99</span>
              <span class="item-quantity">Quantity: <span className="item-amount">01</span></span>
            </li>
            <li class="clearfix">
            </li>
            <li class="clearfix">
            </li>
          </ul>
          <a href="##" class="button">Checkout</a>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Shoppingcart;
