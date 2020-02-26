import React from 'react';
import "./navigation_style.scss";
import Shoppingcart from '../shoppingcart/shoppingcart';

class Navigation extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section className="nav">
                        <div className="nav__brand">
                            <a className="nav__brand-link" href="#">Logo</a>
                        </div>
                        <div className="nav--right">
                            <ul className="nav__items">
                                <li className="nav__item">
                                    <a className="nav__item-link" href="#">Home</a>
                                </li>
                                <li className="nav__item">
                                    <a className="nav__item-link" href="#">About</a>
                                </li>
                                <li className="nav__item">
                                    <a className="nav__item-link" href="#">Categories</a>
                                    <ul className="nav__dropdown">
                                        <li>
                                            <a href="#">Web Design</a>
                                        </li>
                                        <li>
                                            <a href="#">Web Development</a>
                                        </li>
                                        <li>
                                            <a href="#">Graphic Design</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav__item">
                                    <a className="nav__item-link" href="#">Contact</a>
                                </li>
                                <li className="nav__item">
                                    <a className="nav__item-link" href="#" id="cart"><i className="fa fa-shopping-cart"></i> Cart <span class="badge">3</span></a>
                                </li>
                            </ul>
                        </div>
                </section>
            <Shoppingcart />
      </React.Fragment>
    );
  }
}

export default Navigation;