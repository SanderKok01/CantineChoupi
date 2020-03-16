import React from 'react';
import "./products_styles.scss";

import Select from 'react-select';
import Call from '../../helpers/call';

let selectOptions = [];

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.fetchCategories = this.fetchCategories.bind(this);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      catRes: [],
      select: {
        currentSelected: {
          value: null,
          label: null
        },
        hasSelectedValue: false,
        options: null
      }
    };
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    try {
      Call('categoriesWithProducts')
      .then(res => {
        res.forEach(cat => {
          if (cat.products.length !== 0) {
            let obj = {
              value: cat.id,
              label: cat.name
            };
            selectOptions.push(obj);
          };
        });
        this.setState({
          catRes: res,
          select: {
            ...this.state.select,
            options: selectOptions
          }
        });
      }).catch(console.error);
    } catch (err) {
      console.error(err);
    };
  };

  handleChange= (selectedOption) => {
    this.setState({
      select: {
        ...this.state.select,
        currentSelected: selectedOption,
        hasSelectedValue: true
      }
    });
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
      <div className="products">
        <Select isSearchable className="products__select" onChange={ this.handleChange } options={ this.state.select.options } />
        {
          this.state.select.currentSelected.value ? (
            <div className="products__all-cards">
              {
                this.state.catRes.length !== 0 && this.state.select.currentSelected.value ?
                this.state.catRes.find((cat) => cat.id === this.state.select.currentSelected.value).products.map((prod, index2) => {
                  return (
                    <div className="products__card-wrapper" key={ index2 }>
                      <div className="products__card-context-wrapper">
                        <span className="products__card-title">{ prod.name }</span>
                        <span className="products__card-description">{ prod.description }</span>
                        <span className="products__card-price">{ `$${prod.price}` }</span>
                      </div>
                      <div className="products__card-button-wrapper">
                        <button className="products__card-button buy__icon" onClick={ () => { this.addToCart(prod) } }>Add this item to the cart</button>
                      </div>
                    </div>
                  );
                }) : null
              }
            </div>
          ) : (
            <p className="big-text">Select an option :)</p>
          )
        }
      </div>
    );
  };
};

export default Products;
