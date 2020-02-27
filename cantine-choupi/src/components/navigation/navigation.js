import React from 'react';
import "./navigation_styles.scss";

import Shoppingcart from '../shoppingcart/shoppingcart';
import { GiHamburger } from 'react-icons/gi';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-scroll';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.showShoppingCart = this.showShoppingCart.bind(this);
    this.hideShoppingCart = this.hideShoppingCart.bind(this);
    this.checkToHide = this.checkToHide.bind(this);

    this.state = {
      navClass: "is_closed",
      shoppingCart: {
        isShown: false,
        iconShown: false,
        click: this.showShoppingCart
      }
    };
  };

  componentDidMount() {
    this.checkToHide();
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
      }
    });
  };

  hideShoppingCart() {
    this.setState({
      shoppingCart: {
        ...this.state.shoppingCart,
        isShown: false,
        click: this.showShoppingCart
      }
    });
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

  render() {
    return (
      <React.Fragment>
        <GiHamburger className="openbtn" onClick={ this.openNav }>&#9776;</GiHamburger>
        <nav className={ `nav ${ this.state.navClass }` }>
          <span className="close" onClick={ this.closeNav }>&times;</span>
          <Link smooth={ true } duration={ 500 } to="intro" className="nav__link nav__brand">Cantine Choupi</Link>
          <Link smooth={ true } duration={ 500 } to="dishes" className="nav__link">Onze Producten</Link>
          <Link smooth={ true } duration={ 500 } to="about-us" className="nav__link">Over Ons</Link>
          <Link smooth={ true } duration={ 500 } to="categories" className="nav__link">Categoriën</Link>
          <Link smooth={ true } duration={ 500 } to="categories" className="nav__link"></Link>
        </nav>
        {
          this.state.shoppingCart.iconShown ?
          <FiShoppingCart className="shoppingcart-btn" onClick={ this.state.shoppingCart.click } /> : null
        }
        {
          this.state.shoppingCart.isShown ? <Shoppingcart /> : null
        }
      </React.Fragment>
    );
  }
}

export default Navigation;
