import React from 'react';
import "./shoppingcart_styles.scss";
import Button from '../button/button';
import Call from '../../helpers/call';
import { GoTrashcan } from 'react-icons/go';

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

    return window.updateCart(true);
  };

  // To decrease the amount of a product
  decreaseProductAmount(index_of_item) {
    let items = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    let item = items[index_of_item];

    if (item.amount === 1) {
      const confirmation = window.confirm("Are you sure?");

      if (confirmation === true) {
        const newItems = items.slice(index_of_item + 1, index_of_item + 2);
        window.localStorage.setItem('shoppingcart_items', JSON.stringify(newItems));

        const currentItems = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
        if (!currentItems) {
          window.location.reload();
        } else {
          this.setState({
            items: newItems
          });

          window.updateCart(true);
        };
      };
    } else {
      item.amount--;
      window.localStorage.setItem('shoppingcart_items', JSON.stringify(items));

      this.setState({
        items: items
      });
    };

    if (items.length === 0) {
      this.clearCart();
    }
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
    if (!all) {
      return false;
    } else {
      all.map((item, index) => {
        return amount += item.amount;
      });

      return amount;
    };
  };

  getTotalPrice() {
    let total = 0;
    let all = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    if (!all) {
      return;
    } else {
      all.map((item, index) => {
        let price = Number.parseFloat(item.product.price);
        return total += (price * item.amount);
      });

      return Math.round((total + Number.EPSILON) * 100) / 100;
    };
  };

  clearCart() {
    window.localStorage.removeItem('shoppingcart_items');
    window.updateCart(false);
  };

  getTotalProductPrice(index_of_item) {
    let price;
    let items = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    let item = items[index_of_item];

    price = (item.amount * item.product.price);
    return Math.round((price + Number.EPSILON) * 100) / 100;
  };

  getTotalProductAmount(index_of_item) {
    let items = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    let item = items[index_of_item];

    return item.amount;
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
                      <span className="item item-quantity">Quantity: <span className="pauper item-amount">{ this.getTotalProductAmount(index) }</span></span>
                      <span className="item item-total-price lighter-text">Subtotal: <span className="pauper item-amount">€{ this.getTotalProductPrice(index) }</span></span>
                    </li>
                  </div>
                )
              })
            }
          </ul>
          <Button color="white">Checkout</Button>
          <GoTrashcan className="remove_icon" onClick={ this.clearCart } />
        </div>
      </React.Fragment>
    );
  };
};

export default Shoppingcart;
