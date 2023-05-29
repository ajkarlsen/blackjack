let isAlive = false
let hasBlackJack = false
let playerCards = []
let dealerCards = []
let playerSum = 0
let dealerSum = 0
let playerCardEl = document.getElementById("player-card-el")
let dealerCardEl = document.getElementById("dealer-card-el")
let playerSumEl = document.getElementById("player-sum-el")
let dealerSumEl = document.getElementById("dealer-sum-el")

let player = {
    name: "Alex",
    cash: "12"
}

function newGame() {
    if (isAlive === false || hasBlackJack === true) {
        isAlive = true
        hasBlackJack = false
        playerCards = []
        dealerCards = []
        playerCards.push(getRandomCard(), getRandomCard())
        dealerCards.push(getRandomCard())
        playerSum = playerCards[0]+playerCards[1]
        dealerSum = dealerCards[0]
        renderGame()
    }
}

function renderGame() {
    
    playerSumEl.textContent = "Sum: " + playerSum
    dealerSumEl.textContent = "Sum: " + dealerSum

    for (let i = 0; i < playerCards.length; i++) {
        playerCardEl.textContent += " " + playerCards[i]
    }
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardEl.textContent += " " + dealerCards[i]
    }
}

function newCard() {
    let newCard = getRandomCard()
    playerCards.push(newCard)
    playerSum += newCard
}


function getRandomCard() {
    let randomNumber = Math.ceil(Math.random() * 13)
    if (randomNumber === 1) {
        return 11
    } else if (randomNumber >= 10) {
        return 10
    } else {
        return randomNumber
    }
}

