import React from 'react';
import "./shoppingcart_styles.scss";
import Button from '../button/button';
import Call from '../../helpers/call';

class Shoppingcart extends React.Component {
  constructor(props) {
    super(props);

    // Functions
    this.loadStorage = this.loadStorage.bind(this);
    this.increaseProductAmount = this.increaseProductAmount.bind(this);
    this.decreaseProductAmount = this.decreaseProductAmount.bind(this);
    this.getProducts = this.getProducts.bind(this);

    // State
    this.state = {
      items: [],
      productRes: []
    };
  };

  componentDidMount() {
    this.loadStorage();
    this.getProducts();
  }

  // Set state to render all components from storage by ID and amount
  loadStorage() {
    let itemsArray = JSON.parse(window.localStorage.getItem('shoppingcart_items'));

    this.setState({
      items: itemsArray
    });
  };

  // To increase the amount of a product
  increaseProductAmount(product_id) {
    console.log(product_id);
  };

  // To decrease the amount of a product
  decreaseProductAmount(product_id) {
    console.log(product_id);
  };

  getProducts() {
    try {
      Call('products')
      .then(res => {
        this.setState({
          productRes: res
        });
      })
      .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  getTotalAmount() {
    let amount = 0;
    let all = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    all.map((item, index) => {
      return amount += item.amount;
    });

    return amount;
  }

  getTotalPrice() {
    let total = 0;
    let all = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    all.map((item, index) => {
      let price = Number.parseFloat(item.product.price);
      return total += (price * item.amount);
    });

    return total;
  }

  render() {
    return (
      <React.Fragment>
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            <div className="shopping-cart-total">
              <span className="lighter-text">Total:</span>
              <span className="main-color-text">{ `€${ this.getTotalPrice() }` }</span>
            </div>
            <span className="shopping-cart-amount">{ this.getTotalAmount() }<span className="lighter-text"> products</span></span>
          </div>
          <ul className="shopping-cart-items">
            {
              this.state.productRes.length === 0 ? null
              : this.state.items.length === 0 ? null
              : this.state.items.map((item, index) => {
                return (
                  <li className="clearfix" key={ index }>
                    <span className="item item-name">Name: <span className="pauper">{ item.product.name }</span></span>
                    <span className="item item-price">Price: <span className="pauper">{ `€${item.product.price}` }</span></span>
                    <span className="item item-quantity">Quantity: <span className="pauper item-amount">{ item.amount }</span></span>
                  </li>
                )
              })
            }
          </ul>
          <Button color="white">Checkout</Button>
        </div>
      </React.Fragment>
    );
  };
};

export default Shoppingcart;
