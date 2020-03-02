import React from 'react';
import "./products_styles.scss";

import Select from 'react-select';
import Call from '../../helpers/call';

let selectOptions = [];

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.fetchCategories = this.fetchCategories.bind(this);

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

  render() {
    return (
      <div className="products">
        <Select isSearchable className="products__select" onChange={ this.handleChange } options={ this.state.select.options } />
        {/* {
          this.state.catRes.length !== 0 && this.state.select.hasSelectedValue ? this.state.catRes.map((cat, index) => {
            if (cat.id === this.state.select.currentSelected.value) {
              return (
                <div key={ index }>
                  {
                    cat.products.forEach((prod, index2) => {
                      console.log(cat.products);
                      return (
                        <div class="products__card-column" key={ index2 }>
                          <div class="products__card">
                            <h3>{ prod.name }</h3>
                            <p>{ prod.description }</p>
                            <p>€{ prod.price }</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              );
            } else {
              console.log("AAAAAAAAAAAAAAAAAA");
            }
            return true;
          }) : (
            <p className="big-text">Select an option</p>
          )
        } */}
            {
              this.state.catRes.length !== 0 ? this.state.catRes.forEach((cat, index) => {
                if (cat.products.length !== 0 && cat.id === this.state.select.currentSelected.value) {
                  this.state.catRes[index].products.map((prod, index2) => (
                    <div class="products__card-column" key={ index2 }>
                      <div class="products__card">
                        <h3>{ prod.name }</h3>
                        <p>{ prod.description }</p>
                        <p>€{ prod.price }</p>
                      </div>
                    </div>
                  ));
                } else {
                  return null;
                };
              }) : null
            }
      </div>
    );
  };
};

export default Products;
