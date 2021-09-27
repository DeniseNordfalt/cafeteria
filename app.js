"use strict";

const coffees = [
  { name: "Brygg Kaffe", price: 20 },
  { name: "Cappucino", price: 30 },
  { name: "Latte", price: 40 },
];

class Customer {
  constructor() {
    this.transactions = [];
    this.totalSpent = 0;
  }
  addTransactions(name, quantity, price) {
    this.transactions.push({
      name,
      quantity,
      price,
    });
  }
  calculateTotalSpent() {
    let totalSum = 0;
    this.transactions.forEach((transaction) => {
      totalSum += transaction.price * transaction.quantity;
    });
    this.totalSpent += totalSum;
    return totalSum;
  }
}
const customer = new Customer();

const coffeeMenu = document.getElementById("coffeeMenu");
const numberOfCoffees = document.getElementById("numberOfCoffees");
const submitButton = document.getElementById("submitButton");
const inputForm = document.getElementById("inputForm");
const totalSpentParagraph = document.getElementById("amountSpent");
submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  customer.addTransactions(
    coffees[coffeeMenu.value].name,
    numberOfCoffees.value,
    coffees[coffeeMenu.value].price
  );
  console.log(...customer.transactions);
  console.log(customer.totalSpent);

  totalSpentParagraph.textContent = customer.calculateTotalSpent();

  inputForm.reset();
});
