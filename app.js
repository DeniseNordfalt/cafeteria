"use strict";

const coffees = [
  { name: "Brygg Kaffe", price: 20 },
  { name: "Cappucino", price: 30 },
  { name: "Latte", price: 40 },
];

const ZERO = 0;
const BRONZE = 10;
const SILVER = 30;

class Customer {
  constructor() {
    this.transactions = [];
    this.totalSpent = 0;
    this.numberOfCups = 0;
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
    this.totalSpent = totalSum;
    return totalSum;
  }

  calculateNumberOfCups() {
    let numberOfCups = 0;
    this.transactions.forEach((transaction) => {
      numberOfCups += transaction.quantity;
    });
    this.numberOfCups = numberOfCups;
    return numberOfCups;
  }

  getMembershipStatus(numberOfCups) {
    if (numberOfCups > ZERO && numberOfCups < BRONZE) return "Brons";
    else if (numberOfCups >= BRONZE && numberOfCups < SILVER) return "Silver";
    else return "Gold";
  }
}
const customer = new Customer();

const coffeeMenu = document.getElementById("coffeeMenu");
const numberOfCoffees = document.getElementById("numberOfCoffees");
const submitButton = document.getElementById("submitButton");
const inputForm = document.getElementById("inputForm");
const totalSpentParagraph = document.getElementById("amountSpent");
const membershipStatusParagraph = document.getElementById("membershipStatus");
const transactionsSection = document.getElementById("transactionsSection");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  customer.addTransactions(
    coffees[coffeeMenu.value].name,
    Number(numberOfCoffees.value),
    coffees[coffeeMenu.value].price
  );
  console.log(
    renderTransaction(
      Number(numberOfCoffees.value),
      coffees[coffeeMenu.value].name,
      coffees[coffeeMenu.value].price
    )
  );

  //

  console.log(...customer.transactions);
  console.log(customer.totalSpent);

  totalSpentParagraph.textContent = customer.calculateTotalSpent();
  membershipStatusParagraph.textContent = customer.getMembershipStatus(
    customer.calculateNumberOfCups()
  );

  customer.calculateNumberOfCups();

  inputForm.reset();
});

const renderTransaction = function (quantity, sort, price) {
  const transactionText = `Du Köpte ${quantity} st ${sort} för ${price} kr styck. Summa: ${
    quantity * price
  }`;

  const transactionOverview = document.createElement("p");
  transactionOverview.innerText = transactionText;

  transactionsSection.appendChild(transactionOverview);
};
