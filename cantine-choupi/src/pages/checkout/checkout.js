import React from 'react';
import "./checkout_styles.scss";
import { Redirect, Link } from 'react-router-dom';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Textarea from '../../components/textarea/textarea';
import Send from '../../helpers/send';
import { PayPalButton } from 'react-paypal-button-v2';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.getAllItems = this.getAllItems.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.storeOrder = this.storeOrder.bind(this);
    this.paymentSuccess = this.paymentSuccess.bind(this);
    this.paymentFail = this.paymentFail.bind(this);

    this.state = {
      items: [],
      isConfirmed: false,
      values: {
        firstname: "",
        lastname: "",
        address: "",
        postalcode: "",
        city: "",
        phone: "",
        email: "",
        remark: "",
        paid: null
      },
      orderedItems: [],
      validation: {
        firstname: false,
        lastname: false,
        address: false,
        postalcode: false,
        city: false,
        paid: false
      },
      storeResult: {},
      hasBeenPaid: false
    };
  };

  componentDidMount() {
    this.getAllItems();
  }

  getAllItems() {
    let itemsArray = [];
    if (window.localStorage.getItem("shoppingcart_items")) {
      itemsArray = JSON.parse(window.localStorage.getItem("shoppingcart_items"));
    } else {
      return <Redirect to="/" />;
    };

    this.setState({
      items: itemsArray
    });
  };

  getAmountAndId() {
    let orderedItemsArray = [];

    this.state.items.forEach(item => {
      const obj = {
        amount: item.amount,
        product_id: item.product.id
      };

      orderedItemsArray.push(obj);
    });

    this.setState({
      orderedItems: orderedItemsArray
    })
  }

  calcTotal() {
    let itemsArray = [];
    let totalPrice = 0;
    if (window.localStorage.getItem("shoppingcart_items")) {
      itemsArray = JSON.parse(window.localStorage.getItem("shoppingcart_items"));
    } else {
      return <Redirect to="/" />;
    };

    itemsArray.map((item, index) => {
      let price = Number.parseFloat(item.product.price);
      return totalPrice += (price * item.amount);
    });

    return Math.round((totalPrice + Number.EPSILON) * 100) / 100;
  };

  confirmOrder() {
    this.setState({
      isConfirmed: true
    });

    this.getAmountAndId();
  };

  // ?? SUBMIT FORM ??
  storeOrder(event) {
    event.preventDefault();

    if (!this.state.validation.firstname || !this.state.validation.lastname ||
      !this.state.validation.address || !this.state.validation.postalcode || !this.state.validation.city
      || !this.state.validation.paid)
    {
      return alert("Elk required veld moet ingevuld worden.");
    }

    // eslint-disable-next-line no-mixed-operators
    if (this.state.values.paid === "1" && this.state.hasBeenPaid || this.state.values.paid === "0") {
      const submittedItems = {
        ...this.state.values,
        order_lines: this.state.orderedItems
      }

      try {
        Send.Order(submittedItems)
        .then(res => {
          this.setState({
            storeResult: res
          });
          window.localStorage.removeItem('shoppingcart_items');
          window.updateCart(false);
          alert("Thanks for your purchase!");
          return window.location.reload();
        })
        .catch(console.error);
      } catch (err) {
        console.error(err);
      };
    } else {
      return alert("Graag betalen voordat de bestelling gemaakt kan worden.");
    };
  };

  handleChange(event) {
    let isIncluded = false;
    let needsToBeChanged = false;

    if (this.state.validation.hasOwnProperty(event.target.getAttribute('data-val'))) {
      isIncluded = true;
    };

    if (isIncluded) {
      if (event.target.value.length > 0) {
        needsToBeChanged = true;
      } else {
        needsToBeChanged = false;
      };
    };

    if (isIncluded) {
      if (needsToBeChanged) {
        this.setState({
          values: {
            ...this.state.values,
            [event.target.getAttribute('data-val')]: event.target.value
          },
          validation: {
            ...this.state.validation,
            [event.target.getAttribute('data-val')]: true
          }
        });
      } else {
        this.setState({
          values: {
            ...this.state.values,
            [event.target.getAttribute('data-val')]: event.target.value
          },
          validation: {
            ...this.state.validation,
            [event.target.getAttribute('data-val')]: false
          }
        });
      };
    } else {
      this.setState({
        values: {
          ...this.state.values,
          [event.target.getAttribute('data-val')]: event.target.value
        }
      });
    }
  };

  paymentSuccess() {
    this.setState({
      values: {
        ...this.state.values,
        paid: "1"
      },
      hasBeenPaid: true
    });
    return this.storeOrder(window.event);
  };

  paymentFail(err) {
    console.error(err);
    alert("Payment failed :(");
  };

  render() {
    return (
      <div className="checkout">
        {
          !this.state.isConfirmed ? (
            <React.Fragment>
              <h1 className="checkout__title">Jouw bestelling</h1>
              <div className="checkout__items">
                {
                  this.state.items.length === 0 ? null : this.state.items.map((item, index) => {
                    return (
                      <div className="checkout__item" key={ index }>
                        <p className="checkout__item-name">
                          <span className="checkout__item-name-label">Product</span>
                          <span className="checkout__item-name-value">{ item.product.name }</span>
                        </p>
                        <p className="checkout__item-price">
                          <span className="checkout__item-price-label">Prijs</span>
                          <span className="checkout__item-price-value">{ `$${item.product.price}` }</span>
                        </p>
                        <p className="checkout__item-quantity">
                          <span className="checkout__item-quantity-label">Aantal</span>
                          <span className="checkout__item-quantity-value">{ item.amount }</span>
                        </p>
                      </div>
                    );
                  })
                }
              </div>
              <div className="checkout__total-wrapper">
                <span className="checkout__total"><span className="checkout__total-label">Totaal: </span>${ this.calcTotal() }</span>
              </div>
              <div className="checkout__button-wrapper">
                <Button color="white" classes="checkout__button" onClick={ this.confirmOrder }>Bevestig</Button>
                <Link to="/">
                  <Button color="danger" classes="checkout__button">Annuleer</Button>
                </Link>
              </div>
            </React.Fragment>
          ) : /* If the order has been confirmed */ (
            <React.Fragment>
              <h1 className="checkout-form__title">Jouw informatie</h1>
              <form method="POST" className="checkout-form" onSubmit={ this.storeOrder } data-tag="create_order_form">
                <Input onChange={ this.handleChange } name="firstname" value={ this.state.values.firstname }
                  color={ this.state.validation.firstname ? "success" : "danger" } wrapperClasses="checkout-form__input-wrapper" mandatory label="Voornaam"
                data-val="firstname" type="text" />

                <Input onChange={ this.handleChange } name="lastname" value={ this.state.values.lastname }
                  color={ this.state.validation.lastname ? "success" : "danger" } wrapperClasses="checkout-form__input-wrapper" mandatory label="Achternaam"
                data-val="lastname" type="text" />

                <Input onChange={ this.handleChange } name="address" value={ this.state.values.address }
                  color={ this.state.validation.address ? "success" : "danger" } wrapperClasses="checkout-form__input-wrapper" mandatory label="Adres"
                data-val="address" type="text" />

                <Input onChange={ this.handleChange } name="postalcode" value={ this.state.values.postalcode }
                  color={ this.state.validation.postalcode ? "success" : "danger" } wrapperClasses="checkout-form__input-wrapper" mandatory label="Postcode"
                data-val="postalcode" type="text" />

                <Input onChange={ this.handleChange } name="city" value={ this.state.values.city }
                  color={ this.state.validation.city ? "success" : "danger" } wrapperClasses="checkout-form__input-wrapper" mandatory label="Stad"
                data-val="city" type="text" />

                <Input onChange={ this.handleChange } name="phone" value={ this.state.values.phone }
                  color="white" wrapperClasses="checkout-form__input-wrapper" label="Telefoonnummer"
                data-val="phone" type="tel" />

                <Input onChange={ this.handleChange } name="email" value={ this.state.values.email }
                  color="white" wrapperClasses="checkout-form__input-wrapper" label="Email"
                data-val="email" type="email" />

                <Textarea height="300px" width="725px"
                  label="Opmerkingen" name="remark" color="white" wrapperClasses="checkout-form__textarea-wrapper"
                ></Textarea>

                <div className="checkout-form__payment-wrapper">
                  <div className="checkout-form__select-wrapper">
                    <label className="checkout-form__select-label" for="paid">
                      <span style={
                          this.state.values.paid === "" || this.state.values.paid === null ? {
                            color: "#db2f2f"
                          } : {
                            color: "#68f863"
                          }
                        }
                      >Gelijk betalen</span>
                      <span className="checkout-form__select-required">* required</span>
                    </label>
                    <select className="checkout-form__select" name="paid" onChange={ this.handleChange } data-val="paid"
                      style={
                        this.state.values.paid === "" || this.state.values.paid === null ? {
                          color: "#db2f2f",
                          border: "2px solid #db2f2f"
                        } : {
                          color: "#68f863",
                          border: "2px solid #68f863"
                        }
                      }
                    >
                      <option className="checkout-form__select-option" value="" disabled selected>Selecteer een optie</option>
                      <option className="checkout-form__select-option" value="0">Nee</option>
                      <option className="checkout-form__select-option" value="1">Ja</option>
                    </select>
                  </div>

                  {
                    this.state.values.paid === "1" ? (
                      <div className="checkout-form__payment-buttons-wrapper">
                        <PayPalButton amount={ this.calcTotal() }
                          onApprove={ this.paymentSuccess }
                          onError={ this.paymentFail }
                        />
                      </div>
                    ) : null
                  }

                  <Button type="submit" color="white"
                    classes="checkout-form__submit-button"
                    style={ this.state.values.paid === "1" ? { top: "-150px" } : { top: "130px" } }
                  >Create order</Button>
                </div>
              </form>
            </React.Fragment>
          )
        }
      </div>
    );
  };
};

export default Checkout;
