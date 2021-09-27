'use strict';

const coffees = [
  { name: 'Brygg Kaffe', price: 20 },
  { name: 'Cappucino', price: 30 },
  { name: 'Latte', price: 40 },
];

const membershipStatus = [
  {
    level: 'Brons',
    minCups: 1,
    maxCups: 9,
  },
  {
    level: 'Silver',
    minCups: 10,
    maxCups: 29,
  },
  {
    level: 'Guld',
    minCups: 30,
  },
];

const transactions = [];

const inputForm = document.getElementById('input-form');
const coffeeSort = document.getElementById('coffee-menu');
const numberOfCoffeeCups = document.getElementById('number-of-cups');
const formSubmitButton = document.getElementById('form-button');
const transactionsSection = document.getElementById('transactions-section');

const btnOnClick = function (e) {
  e.preventDefault();

  createTransaction();
  saveTranaction();
  calculateTransactionsPrice();
  inputForm.reset();
  console.log(...transactions);
};

const saveTranaction = function () {
  const transaction = {
    coffee: coffees[coffeeSort.value].name,
    quantity: numberOfCoffeeCups.value,
    price: coffees[coffeeSort.value].price,
  };

  transactions.push(transaction);
};

const createTransactionElement = function () {
  const transaction = document.createElement('p');

  transaction.classList.add('transaction');

  return transaction;
};
const createTransaction = function () {
  const transactionText = `Du köpte ${numberOfCoffeeCups.value} st ${
    coffees[coffeeSort.value].name
  } för ${coffees[coffeeSort.value].price} kr styck. Summa: ${
    numberOfCoffeeCups.value * coffees[coffeeSort.value].price
  }  `;

  const transaction = createTransactionElement();
  transaction.innerText = transactionText;
  transactionsSection.appendChild(transaction);
};

const calculateTransactionsPrice = function () {
  let totalPrice = 0;
  transactions.forEach(x => {
    let totalPerTransaction = 0;
    totalPerTransaction = x.quantity * x.price;
    totalPrice += totalPerTransaction;
  });
  console.log(totalPrice);

  return totalPrice;
};

formSubmitButton.addEventListener('click', btnOnClick);
