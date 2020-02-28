import React from 'react';
import "./landing_styles.scss";

import Call from "../../helpers/call";

import { Slide } from 'react-slideshow-image';
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { Link } from 'react-scroll';
import Card from '../../components/card/card';
import { LoremIpsum } from 'react-lorem-ipsum';

const carouselProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true
}

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.setData = this.setData.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      dataRes: [],
      categoriesRes: []
    };
  };

  async componentDidMount() {
    await this.setData();
    await this.getCategories();
  }

  getCategories() {
    try {
      Call('categoriesWithProducts')
      .then(res => {
        this.setState({
          categoriesRes: res
        });
      })
      .catch(console.error);
    } catch (err) {
      console.error(err);
    };
  }

  setData() {
    try {
      Call('products')
      .then(res => {
        this.setState({
          dataRes: res
        });
      })
      .catch(console.error);
    } catch (err) {
      console.error(err);
    };
  };

  addToCart(prod) {
    let resultGiven = false;
    let items = JSON.parse(window.localStorage.getItem('shoppingcart_items'));

    if (!items) {
      items = [];
      const obj = {
        amount: 1,
        product: prod
      };

      items.push(obj);
      window.localStorage.setItem('shoppingcart_items', JSON.stringify(items));

      window.updateCart(true);
    } else {
      items.forEach((item, index) => {
        // If item already exists in localStorage
        if (item.product.id === prod.id) {
          item.amount++;
          resultGiven = true;
        };
      });

      if (resultGiven) {
        window.localStorage.setItem('shoppingcart_items', JSON.stringify(items));
        window.updateCart(true);
      } else {
        const obj = {
          amount: 1,
          product: prod
        };

        items.push(obj);
        window.localStorage.setItem('shoppingcart_items', JSON.stringify(items));
        window.updateCart(true);
      };
    };
  };

  render() {
    return (
      <div className="landing">
        <section className="intro" name="intro">
          <h1 className="intro__title">Cantine Choupi</h1>
          <Link to="dishes" smooth={ true } duration={ 500 }>
            <TiArrowDownOutline className="intro__icon" />
          </Link>
        </section>
        <section className="dishes" name="dishes">
          <p className="dishes__title">Onze Producten</p>
          <div className="carousel__wrapper">
              {
                this.state.dataRes.length === 0 ? null : (
                  <Slide { ...carouselProperties }>
                    <div className="each-fade">
                      <div className="carousel__image-container image-container">
                        <img className="carousel__image" src={ this.state.dataRes[0].image_url } alt={ this.state.dataRes[0].name } />
                      </div>
                      <div className="carousel__text-wrapper">
                        <h2 className="carousel__text-title">{ this.state.dataRes[0].name }</h2>
                        <p className="carousel__text-description">{ this.state.dataRes[0].description }</p>
                        <p className="carousel__text-description">Klik <a className="dishes__link" href="##">hier</a> voor meer informatie</p>
                      </div>
                    </div>
                    <div className="each-fade">
                      <div className="carousel__image-container image-container">
                        <img className="carousel__image" src={ this.state.dataRes[12].image_url } alt={ this.state.dataRes[12].name } />
                      </div>
                      <div className="carousel__text-wrapper">
                        <h2 className="carousel__text-title">{ this.state.dataRes[12].name }</h2>
                        <p className="carousel__text-description">{ this.state.dataRes[12].description }</p>
                        <p className="carousel__text-description">Klik <a className="dishes__link" href="##">hier</a> voor meer informatie</p>
                      </div>
                    </div>
                    <div className="each-fade">
                      <div className="carousel__image-container image-container">
                        <img className="carousel__image" src={ this.state.dataRes[7].image_url } alt={ this.state.dataRes[7].name } />
                      </div>
                      <div className="carousel__text-wrapper">
                        <h2 className="carousel__text-title">{ this.state.dataRes[7].name }</h2>
                        <p className="carousel__text-description">{ this.state.dataRes[7].description }</p>
                        <p className="carousel__text-description">Klik <a className="dishes__link" href="##">hier</a> voor meer informatie</p>
                      </div>
                    </div>
                  </Slide>
                )
              }
            <p className="dishes__all-products">Geïnteresseerd? Klik <a className="dishes__link" href="##">hier</a> voor alle producten.</p>
          </div>
        </section>
        <Link to="about-us" smooth={ true } duration={ 500 }>
          <TiArrowDownOutline className="dishes__icon" />
        </Link>
        <section name="about-us" className="about-us">
          <h3 className="about-us__title">Over Ons</h3>
          <div className="about-us__description-wrapper">
            <p className="about-us__description about-us__description--long"><LoremIpsum p={3} /></p>
            <p className="about-us__description"><LoremIpsum p={2} /></p>
            <p className="about-us__description about-us__description--long"><LoremIpsum p={3} /></p>
          </div>
        </section>
        <Link to="categories" smooth={ true } duration={ 500 }>
          <TiArrowDownOutline className="about-us__icon" />
        </Link>
        <section name="categories" className="categories">
          <h3 className="categories__title">De Categoriën</h3>
          <div className="categories__wrapper">
            {
              this.state.categoriesRes.length === 0 ? null : this.state.categoriesRes.map((cat, index) => {
                return (
                  <React.Fragment key={ index }>
                    {
                      cat.products.length === 0 ? null : (
                        <Card key={ index } title={ cat.name } wrapper=".categories__wrapper">
                          <div className="categories__items">
                              {
                                cat.products.map((prod, index) => {
                                  return (
                                    <div className="categories__item" key={ index }>
                                      <span>{ prod.name }</span>
                                      <img height="50px" src={ prod.image_url } alt={ prod.name } />
                                      <div className="categories__container">
                                        <button className="categories__button categories__button--increase" onClick={ () => { this.addToCart(prod) } }>+</button>
                                      </div>
                                    </div>
                                  );
                                })
                              }
                          </div>
                        </Card>
                      )
                    }
                  </React.Fragment>
                )
              })
            }
          </div>
        </section>
        <Link to="intro" smooth={ true } duration={ 1000 }>
          <TiArrowUpOutline className="categories__icon" />
        </Link>
      </div>
    );
  }
}

export default Landing;
