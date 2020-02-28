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
  increaseProductAmount(index_of_item) {
    let items = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    let item = items[index_of_item];
    item.amount++;

    window.localStorage.setItem('shoppingcart_items', JSON.stringify(items));

    this.setState({
      items: items
    });
  };

  // To decrease the amount of a product
  decreaseProductAmount(index_of_item) {
    let items = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    let item = items[index_of_item];
    item.amount--;

    window.localStorage.setItem('shoppingcart_items', JSON.stringify(items));

    this.setState({
      items: items
    });
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

    return Math.round((total + Number.EPSILON) * 100) / 100;
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
                  <div className="shopping-cart__item-wrapper" key={ index }>
                    <button className="shopping-cart__button shopping-cart__button--increase" onClick={ () => { this.increaseProductAmount(index) } }>+</button>
                    <button className="shopping-cart__button shopping-cart__button--decrease" onClick={ () => { this.decreaseProductAmount(index) } }>-</button>
                    <li className="clearfix">
                      <span className="item item-name">Name: <span className="pauper">{ item.product.name }</span></span>
                      <span className="item item-price">Price: <span className="pauper">{ `€${item.product.price}` }</span></span>
                      <span className="item item-quantity">Quantity: <span className="pauper item-amount">{ item.amount }</span></span>
                    </li>
                  </div>
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
