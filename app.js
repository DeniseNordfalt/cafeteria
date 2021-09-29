"use strict";

const coffees = [
  { name: "Brygg Kaffe", price: 20 },
  { name: "Cappucino", price: 30 },
  { name: "Latte", price: 40 },
];

//defines the levels of memberships
const BRONZE = 0;
const SILVER = 10;
const GOLD = 30;

//defines the levels of discounts
const FIRST_DISCOUNT = 500;
const TEN_PERCENT = 0.9;

const SECOND_DISCOUNT = 1000;
const FIFTEEN_PERCENT = 0.85;


class Customer {
  constructor() {
    this.transactions = [];
    this.totalSpent = 0;
    this.numberOfCups = 0;
  }

  addTransactions(name, quantity, price) {
    price = this.getDiscount(price) 

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
  getDiscount(price) {
    if (this.totalSpent >= FIRST_DISCOUNT && this.totalSpent < SECOND_DISCOUNT) {
      return  price * TEN_PERCENT;
    }
    else if(this.totalSpent >= SECOND_DISCOUNT)
    {
        return price * FIFTEEN_PERCENT
    }

    return price;
  }
}

//defines the constants used from the html document

const customer = new Customer();

const inputForm = document.getElementById("inputForm");
const coffeeMenu = document.getElementById("coffeeMenu");
const numberOfCoffees = document.getElementById("numberOfCoffees");
const submitButton = document.getElementById("submitButton");

const totalSpentParagraph = document.getElementById("amountSpent");
const membershipStatusParagraph = document.getElementById("membershipStatus");

const transactionsSection = document.getElementById("transactionsSection");
const transactionsHeading = document.getElementById("transactionsHeading");



//prints  the coffeemenu options from array on page load
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

//outputs transactions
const renderTransaction = function (quantity, sort, price) {
  
    price = customer.getDiscount(price)


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

  //lists the transactions by latest at top
  const transactionOverview = document.createElement("p");
  transactionOverview.innerText = transactionText;

  transactionsSection.insertBefore(
    transactionOverview,
    transactionsHeading.nextSibling
  );
};


//validates input and alerts the user of errors
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

let doesElementExist = false


const totalCostElement = document.createElement("p")
const customerMembership = document.createElement("p")

//outputs in header
const renderCostAndMembershipStatus = function () {
    const headerContainer = document.getElementById("header")

    if(doesElementExist === false){
        
        doesElementExist = true
        totalCostElement.innerText = totalCostElement.innerText = `Du har handlat för ${customer.totalSpent} kr`
        customerMembership.innerText = `Medlemskapsstatus: ${customer.getMembershipStatus(customer.numberOfCups)}`
        headerContainer.appendChild(totalCostElement)
        headerContainer.appendChild(customerMembership)
    }
  
    else if(doesElementExist === true){

        totalCostElement.innerText = totalCostElement.innerText = `Du har handlat för ${customer.totalSpent} kr`
        customerMembership.innerText = `Medlemskapsstatus: ${customer.getMembershipStatus(customer.numberOfCups)}`
        console.log(doesElementExist)
    }
    
    

};

