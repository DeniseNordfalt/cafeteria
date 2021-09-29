"use strict";

const coffees = [
  { name: "Brygg Kaffe", price: 20 },
  { name: "Cappucino", price: 30 },
  { name: "Latte", price: 40 },
];

const BRONZE = 0;
const SILVER = 10;
const GOLD = 30;

const FIVE_HUNDRED = 500;
const TEN_PERCENT = 0.1;

class Customer {
  constructor() {
    this.transactions = [];
    this.totalSpent = 0;
    this.numberOfCups = 0;
  }

  addTransactions(name, quantity, price) {
    if (this.getDiscount()) {
      price -= price * TEN_PERCENT;
    }

    this.transactions.push({
      name,
      quantity,
      price,
    });
  }

  calculateCupsAndSum() {
    let totalSum = 0;
    let totalCups = 0;

    this.transactions.forEach((transaction) => {
      totalSum += transaction.price * transaction.quantity;
      totalCups += transaction.quantity;
    });

    this.totalSpent = totalSum;
    this.numberOfCups = totalCups;
  }

  getMembershipStatus(numberOfCups) {
    if (numberOfCups > BRONZE && numberOfCups < SILVER) return "Brons";
    else if (numberOfCups >= SILVER && numberOfCups < GOLD) return "Silver";
    else return "Gold";
  }
  getDiscount() {
    if (this.totalSpent >= FIVE_HUNDRED) {
      return true;
    }
    return false;
  }
}
const customer = new Customer();

const inputForm = document.getElementById("inputForm");
const coffeeMenu = document.getElementById("coffeeMenu");
const numberOfCoffees = document.getElementById("numberOfCoffees");
const submitButton = document.getElementById("submitButton");

const totalSpentParagraph = document.getElementById("amountSpent");
const membershipStatusParagraph = document.getElementById("membershipStatus");

const transactionsSection = document.getElementById("transactionsSection");
const transactionsHeading = document.getElementById("transactionsHeading");

window.addEventListener("load", function () {
  coffees.forEach((coffee, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = `${coffee.name} - ${coffee.price} kr`;
    coffeeMenu.appendChild(option);
  });
});

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (validateInput()) {
    customer.addTransactions(
      coffees[coffeeMenu.value].name,
      Number(numberOfCoffees.value),
      coffees[coffeeMenu.value].price
    );

    renderTransaction(
      Number(numberOfCoffees.value),
      coffees[coffeeMenu.value].name,
      coffees[coffeeMenu.value].price
    );

    customer.calculateCupsAndSum();

    renderCostAndMembershipStatus();
  }

  inputForm.reset();
});

const renderTransaction = function (quantity, sort, price) {
  if (customer.getDiscount()) {
    price -= price * TEN_PERCENT;
  }

  const transactionText = `Du Köpte ${quantity} st ${sort} för ${price} kr styck. Summa: ${
    quantity * price
  }`;

  const transactionParagraph = document.getElementById("transactionParagraph");

  if (
    typeof transactionParagraph != "undefined" &&
    transactionParagraph != null
  ) {
    transactionsSection.removeChild(transactionParagraph);
  }

  const transactionOverview = document.createElement("p");
  transactionOverview.innerText = transactionText;

  transactionsSection.insertBefore(
    transactionOverview,
    transactionsHeading.nextSibling
  );
};

const validateInput = function () {
  if (numberOfCoffees.value <= 0) {
    alert("Du måste köpa minst en kopp kaffe❌");
    return false;
  } else if (numberOfCoffees.value > 10) {
    alert("Du får köpa upp till tio kaffe koppar❌");
    return false;
  }
  return true;
};

const renderCostAndMembershipStatus = function () {
  totalSpentParagraph.textContent = customer.totalSpent;
  membershipStatusParagraph.textContent = customer.getMembershipStatus(
    customer.numberOfCups
  );
};
