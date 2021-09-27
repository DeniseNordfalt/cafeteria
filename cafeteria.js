//array for name and price of coffe
const coffees = [
    {name: 'Brygg Kaffe', price: 20},
    {name: 'Cappucino', price: 30},
    {name: 'Latte', price: 40}
  ]

  //customer class
  class Customer {
    constructor() 
    {
        this.transactions = []
        this.numberOfCups = 0
        this.cupsBought = []
        
        this.silver = 10
        this.gold = 30
        this.membershipStatus = ""

    }

    //adds instance of transaction
    addTransaction(amount) {
        this.transactions.push(amount)
    }

    //gets and returns the total of the transactions
    getTotalSpent() {
        let sum = 0
        this.transactions.forEach(transaction => {
            sum += transaction
        })
        return sum
    }

    //checks what tier of membership status the cutomer is at
    checkMembershipStatus(numberOfCups){

        if (numberOfCups < this.silver)
        {
            this.membershipStatus = "Brons"
        }
        else if (numberOfCups >= this.silver && numberOfCups < this.gold)
        {
            this.membershipStatus = "Silver"
        }

        else if(numberOfCups >= this.gold)
        {
            this.membershipStatus = "Guld"
        }

        return this.membershipStatus

    }

    //checks the price of the different coffees REFACTOR
    //TODO: render select lement with array
     pricePerCup()
    {
        const coffeValue = typeOfCoffee.value
        let  price = 0
        if (coffeValue == 1)
        {
            price = coffees[0].price
        }
        else if(coffeValue == 2)
        {
            price = coffees[1].price
        }
        else if (coffeValue == 3)
        {
            price = coffees[2].price
        }

        return price
    }

    //prints the transactions //NOT COMPLETE! REFACTOR
    //TODO: fix print to show transactions of different cups and sums of  those
    printTransactions()
    {
    return `${customer.transactions}`
    }

}


const customer = new Customer()

//Executes on click  //REFACTOR
function onBuyButtonClick()
{
    const inputNumberOfCoffees = document.getElementById("numberOfCoffees")

    
    let numberOfCups = inputNumberOfCoffees.value
    let pricePerCup = customer.pricePerCup()

    console.log(inputNumberOfCoffees.value)
    const transactionValue = pricePerCup * numberOfCups


    console.log(transactionValue)
    customer.addTransaction(transactionValue)

    customer.addCupsBought(numberOfCups)
    console.log(customer.transactions)

    const totalSpentParagraph = document.getElementById("totalSpent")
    totalSpentParagraph.innerHTML = customer.getTotalSpent()

    const membershipStatusParagraph= document.getElementById("membership")
    membershipStatusParagraph.innerHTML =  customer.checkMembershipStatus(numberOfCups)

    const transactionsParagraph = document.getElementById("transactions")
    transactionsParagraph.innerHTML = customer.printTransactions()

}

//TODO: catch negative input of cups
//TODO: catch input of > 10 cups + error message
//TODO: list transactions last to first (print array backwards)
//TODO: print if null transactions
//TODO: -10% if totalSpent > 500 < 1000
//TODO: -15% if totalSpent > 1000


