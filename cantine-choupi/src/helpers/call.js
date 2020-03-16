import React from 'react';

// Public
const catWithProd = async function() {
  const res = await fetch(`https://competa-api.dev.competa.com/api/categoriesWithProducts`);
  return await res.json();
}

// Public
const products = async function() {
  const res = await fetch(`https://competa-api.dev.competa.com/api/categoriesWithProducts`);
  return await res.json();
}

// Protected
const orders = async function(token) {
  if (!token) {
    return console.error("Token expected to call orders.");
  };
  const res = await fetch(`https://competa-api.dev.competa.com/api/orders?token=${token}`);
  return await res.json();
}

class Call extends React.Component {
  static catWithProd: Function;
  static products: Function;
  static orders: Function;
}

Call.catWithProd = catWithProd;
Call.products = products;
Call.orders = orders;
export default Call;
