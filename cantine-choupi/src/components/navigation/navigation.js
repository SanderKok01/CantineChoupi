import React from 'react';
import "./navigation_styles.scss";

import Shoppingcart from '../shoppingcart/shoppingcart';
import { GiHamburger } from 'react-icons/gi';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosUndo } from 'react-icons/io';
import { Link } from 'react-scroll';
import { Link as HrefLink } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.showShoppingCart = this.showShoppingCart.bind(this);
    this.hideShoppingCart = this.hideShoppingCart.bind(this);
    this.checkToHide = this.checkToHide.bind(this);
    this.updateCart = this.updateCart.bind(this);

    window.updateCart = this.updateCart;

    this.state = {
      navClass: "is_closed",
      shoppingCart: {
        isShown: false,
        iconShown: false,
        click: this.showShoppingCart
      },
      dynamicState: false
    };
  };

  componentDidMount() {
    this.checkToHide();
    this.updateCart();
  }

  openNav() {
    this.setState({
      navClass: "is_open"
    });
  };

  closeNav() {
    this.setState({
      navClass: "is_closed"
    });
  };

  // ShoppingCart functions
  showShoppingCart() {
    this.setState({
      shoppingCart: {
        ...this.state.shoppingCart,
        isShown: true,
        click: this.hideShoppingCart
      },
      dynamicState: true
    });
  };

  hideShoppingCart() {
    this.setState({
      shoppingCart: {
        ...this.state.shoppingCart,
        isShown: false,
        click: this.showShoppingCart
      },
      dynamicState: false
    });
  };

  updateCart(bool) {
    if (bool) {
      this.setState({
        dynamicState: true
      });
    } else {
      this.setState({
        dynamicState: false
      });
    };
  };

  checkToHide() {
    if (window.localStorage.getItem('shoppingcart_items')) {
      this.setState({
        shoppingCart: {
          ...this.state.shoppingCart,
          iconShown: true
        }
      });
    };
  };

  getTotalAmount() {
    let amount = 0;
    let all = JSON.parse(window.localStorage.getItem('shoppingcart_items'));
    if (!all) {
      return;
    } else {
      all.map((item, index) => {
        return amount += item.amount;
      });

      return amount;
    };
  };

  render() {
    if (this.props.type === 'landing') {
      return (
        <React.Fragment>
          <GiHamburger className="openbtn" onClick={ this.openNav }>&#9776;</GiHamburger>
          <nav className={ `nav ${ this.state.navClass }` }>
            <span className="close" onClick={ this.closeNav }>&times;</span>
            <Link smooth={ true } duration={ 500 } to="intro" className="nav__link nav__brand" onClick={ this.closeNav }>Cantine Choupi</Link>
            <Link smooth={ true } duration={ 500 } to="dishes" className="nav__link" onClick={ this.closeNav }>Onze Producten</Link>
            <Link smooth={ true } duration={ 500 } to="about-us" className="nav__link" onClick={ this.closeNav }>Over Ons</Link>
            <Link smooth={ true } duration={ 500 } to="categories" className="nav__link" onClick={ this.closeNav }>Categoriën</Link>
          </nav>
          {
            this.state.shoppingCart.iconShown || this.state.dynamicState ? (
              <React.Fragment>
                {
                  this.state.shoppingCart.isShown ? null : (
                    <div className="shopping-cart-total-products">{ this.getTotalAmount() }</div>
                  )
                }
                <FiShoppingCart className="shoppingcart-btn" onClick={ this.state.shoppingCart.click } />
              </React.Fragment>
            ) : null
          }
          {
            this.state.shoppingCart.isShown ? <Shoppingcart /> : null
          }
        </React.Fragment>
      );
    } else if (this.props.type === 'products') {
      return (
        <React.Fragment>
          <GiHamburger className="openbtn" onClick={ this.openNav }>&#9776;</GiHamburger>
          <nav className={ `nav ${ this.state.navClass }` }>
            <span className="close" onClick={ this.closeNav }>&times;</span>
            <HrefLink smooth={ true } duration={ 500 } to="/" className="nav__link nav__brand" onClick={ this.closeNav }><IoIosUndo /> Back</HrefLink>
            <Link smooth={ true } duration={ 500 } to="dishes" className="nav__link" onClick={ this.closeNav }>Categories</Link>
          </nav>
          {
            this.state.shoppingCart.iconShown || this.state.dynamicState ? (
              <React.Fragment>
                {
                  this.state.shoppingCart.isShown ? null : (
                    <div className="shopping-cart-total-products">{ this.getTotalAmount() }</div>
                  )
                }
                <FiShoppingCart className="shoppingcart-btn" onClick={ this.state.shoppingCart.click } />
              </React.Fragment>
            ) : null
          }
          {
            this.state.shoppingCart.isShown ? <Shoppingcart /> : null
          }
        </React.Fragment>
      );
    }
  };
};

export default Navigation;
