import React from 'react';

const Order = async function(recieved_data) {
  await fetch(`https://competa-api.dev.competa.com/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstname: recieved_data.firstname,
      lastname: recieved_data.lastname,
      address: recieved_data.address,
      postalcode: recieved_data.postalcode,
      city: recieved_data.city,
      phone: Number.parseInt(recieved_data.phone),
      email: recieved_data.email,
      remark: recieved_data.remark,
      paid: recieved_data.paid,
      send_out_at: null,
      delivered_at: null,
      order_lines: recieved_data.order_lines
    })
  })
  .then((res) => res.json())
  .then((data => {
    return data;
  }))
  .catch(console.error);
};

const Login = async function(recieved_data) {
  await fetch(`https://competa-api.dev.competa.com/api/authorise`, {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recieved_data)
  })
  .then((res) => res.json())
  .then((data => {
    window.loginToken = data.token;
    return data;
  }))
  .catch(console.error);
};

class Send extends React.Component {
  static Order: Function;
  static Login: Function;
};

Send.Order = Order;
Send.Login = Login;
export default Send;
