import React from 'react';
import "./navigation_style.scss";
import Shoppingcart from '../shoppingcart/shoppingcart';

class Navigation extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section className="nav">
                        <div class="nav__brand">
                            <a href="#!">Logo</a>
                        </div>
                        <div className="nav--right">
                        <ul class="nav-list">
                            <li>
                                <a href="#!">Home</a>
                            </li>
                            <li>
                                <a href="#!">About</a>
                            </li>
                            <li>
                                <a href="#!">Services</a>
                                <ul class="nav-dropdown">
                                    <li>
                                        <a href="#!">Web Design</a>
                                    </li>
                                    <li>
                                        <a href="#!">Web Development</a>
                                    </li>
                                    <li>
                                        <a href="#!">Graphic Design</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#!">Contact</a>
                            </li>
                            <li>
                                <a href="#" id="cart"><i class="fa fa-shopping-cart"></i> Cart <span class="badge">3</span></a>
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