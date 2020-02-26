import React from 'react';
import "./landing_styles.scss";

import Call from "../../helpers/call";

import { Slide } from 'react-slideshow-image';
import { TiArrowDownOutline } from "react-icons/ti";
import { Link } from 'react-scroll';

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

    this.state = {
      dataRes: []
    };
  };

  async componentDidMount() {
    await this.setData();
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
        <section className="intro">
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
            <p className="about-us__description about-us__description--long">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse!</p>
            <p className="about-us__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <p className="about-us__description about-us__description--long">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse! Officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dignissimos explicabo inventore quia consectetur minus ad magni, blanditiis consequatur, incidunt eos itaque commodi tempore. Tempore minima ducimus fuga nemo dignissimos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio reiciendis odio nisi esse dicta vero? Ipsa ratione adipisci quisquam. Sunt aliquam accusantium unde dicta tenetur sed veritatis itaque id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae quasi quae, ex aperiam excepturi enim perspiciatis quo in mollitia incidunt, ipsa vel dolorum voluptate molestiae laborum eum esse!</p>
          </div>
        </section>
        <Link to="about-us" smooth={ true } duration={ 500 }>
          <TiArrowDownOutline className="about-us__icon" />
        </Link>
      </div>
    );
  }
}

export default Landing;
