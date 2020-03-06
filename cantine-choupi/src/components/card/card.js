import React from 'react';
import "./card_styles.scss";

import { FaTimes } from 'react-icons/fa';
import { GoInfo } from 'react-icons/go';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setOthersInactive = this.setOthersInactive.bind(this);
    this.setOthersActive = this.setOthersActive.bind(this);

    this.state = {
      isOpen: false,
      click: this.open,
      classes: {
        card: "card [ is-collapsed ]",
        card_inner: "card__inner"
      },
      inactiveClass: "is-inactive"
    };
  };

  open() {
    this.setState({
      click: this.close,
      classes: {
        ...this.state.classes,
        card: "card [ is-expanded ]"
      }
    });
    this.setOthersInactive();
  };

  close() {
    this.setState({
      click: this.open,
      classes: {
        ...this.state.classes,
        card: "card [ is-collapsed ]"
      }
    });
    this.setOthersActive();
  };

  setOthersInactive() {
    const allCards = document.querySelector(this.props.wrapper).querySelectorAll('.card');
    let currentCard;
    Array.from(allCards).forEach(function(card) {
      if (card.classList.contains('is-expanded')) {
        currentCard = card;
      };

      if (card !== currentCard) {
        card.classList.add('is-inactive');
        card.setAttribute('disabled', "true");
      };
    });
  };

  setOthersActive() {
    const allCards = document.querySelector(this.props.wrapper).querySelectorAll('.card');
    let currentCard;
    Array.from(allCards).forEach(function(card) {
      if (card.disabled) {
        currentCard = card;
      };

      if (card !== currentCard) {
        card.classList.remove('is-inactive');
        card.removeAttribute('disabled');
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className={ this.state.classes.card }>
          <div className={ this.state.classes.card_inner } onClick={ this.disabled ? null : this.state.click }>
            <span>{ this.props.title }</span>
            <GoInfo className="fa info__icon" />
          </div>
          <div className="card__expander">
            <FaTimes className="fa" onClick={ this.close } />
            { this.props.children }
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default Card;
