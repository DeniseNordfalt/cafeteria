'use strict';

const coffees = [
  { name: 'Brygg Kaffe', price: 20 },
  { name: 'Cappucino', price: 30 },
  { name: 'Latte', price: 40 },
];

const inputForm = document.getElementById('input-form');

const coffeeSort = document.getElementById('coffee-menu');
const numberOfCoffeeCups = document.getElementById('number-of-cups');

const formSubmitButton = document.getElementById('form-button');

const f = function (e) {
  e.preventDefault();
  console.log(coffeeSort.value, numberOfCoffeeCups.value);
  console.log(createTransaction());
  inputForm.reset();
};

const createTransaction = function () {
  return `Du köpte ${numberOfCoffeeCups.value} st ${
    coffees[coffeeSort.value].name
  } för ${coffees[coffeeSort.value].price} kr styck. Summa: ${
    numberOfCoffeeCups.value * coffees[coffeeSort.value].price
  }  `;
};

formSubmitButton.addEventListener('click', f);
