import React from 'react';
import "./navigation_styles.scss";

import Shoppingcart from '../shoppingcart/shoppingcart';
import { GiHamburger } from 'react-icons/gi';
import { Link } from 'react-scroll';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);

    this.state = {
      navClass: "is_closed"
    };
  };

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
      </React.Fragment>
    );
  }
}

export default Navigation;
