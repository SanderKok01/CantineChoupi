import React from 'react';
import "./landing_styles.scss";

import Call from "../../helpers/call";

import { Slide } from 'react-slideshow-image';
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { Link } from 'react-scroll';
import Card from '../../components/card/card';

const longLorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse!";
const shortLorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit.";

const carouselProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true
}

const categoriesCarouselProperties = {
  duration: 10000,
  transitionDuration: 500,
  infinite: true,
  indicators: true
}

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.setData = this.setData.bind(this);
    this.getCategories = this.getCategories.bind(this);

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
            <p className="about-us__description about-us__description--long">{ longLorem }</p>
            <p className="about-us__description">{ shortLorem }</p>
            <p className="about-us__description about-us__description--long">{ longLorem }</p>
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
                          <div className="categories__carousel__wrapper">
                            <Slide { ...categoriesCarouselProperties }>
                              {
                                cat.products.map((prod, index) => {
                                  return (
                                    <div className="categories__carousel__each-fade" key={ index }>
                                      <div className="categories__carousel__text-wrapper">
                                        <h2 className="categories__carousel__text-title">{ prod.name }</h2>
                                        <p className="categories__carousel__text-description">{ prod.description }</p>
                                      </div>
                                    </div>
                                  );
                                })
                              }
                            </Slide>
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
