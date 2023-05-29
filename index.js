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
let messageEl = document.getElementById("message-el")

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
        if (playerSum === 21) {
            blackJack()
        } else {
            renderGame()
        }
    }
}

function renderGame() {
    
    playerSumEl.textContent = "Sum: " + playerSum
    dealerSumEl.textContent = "Sum: " + dealerSum

    playerCardEl.textContent = "Cards: "
    dealerCardEl.textContent = "Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        playerCardEl.textContent += " " + playerCards[i]
    }
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardEl.textContent += " " + dealerCards[i]
    }
    if (playerSum > 21) {
        isAlive = false
        messageEl.textContent = "You're out, play again?"
    } else if (playerSum === 21) {
        messageEl.textContent = "Stand to see dealer"
        hasBlackJack = true
    } else {
        messageEl.textContent = "New card?"
    }
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let newCard = getRandomCard()
        playerCards.push(newCard)
        playerSum += newCard
        renderGame()
    }
}

function dealerTurn() {
    if (isAlive === true) {
        while (dealerSum < playerSum && dealerSum < 17) {
            let newCard = getRandomCard()
            dealerCards.push(newCard)
            dealerSum += newCard
            renderGame()
        }
        if (dealerSum > 21) {
            messageEl.textContent = "Dealer busts, you won"
            isAlive = false
        } else if (dealerSum > playerSum) {
            messageEl.textContent = "Dealer wins"
            isAlive = false
        } else if (dealerSum === playerSum) {
            isAlive = false
            messageEl.textContent = "Stand off, money back"
        } else {
            isAlive = false
            messageEl.textContent = "You win"
        }
    }
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

