import React from 'react';
import "./orders_styles.scss";
import Call from '../../../helpers/call';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.getAllOrders = this.getAllOrders.bind(this);

    this.state = {
      allOrders: null,
      token: window.sessionStorage.getItem('token')
    };
  };

  componentDidMount() {
    this.getAllOrders();
  }

  getAllOrders() {
    try {
      Call.orders(this.state.token)
      .then(res => {
        this.setState({
          allOrders: res
        });
      })
      .catch(console.error);
    } catch (err) {
      console.error(err);
    };
  };

  render() {
    return (
      <React.Fragment>
        <span>Orders</span>
      </React.Fragment>
    );
  };
};

export default Orders;
