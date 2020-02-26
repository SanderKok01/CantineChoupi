import React from 'react';
import "./landing_styles.scss";

import Call from "../../helpers/call";

import { Slide } from 'react-slideshow-image';
import { TiArrowDownOutline } from "react-icons/ti";

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
          <TiArrowDownOutline className="intro__icon" />
        </section>
        <section className="dishes">
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
      </div>
    );
  }
}

export default Landing;
