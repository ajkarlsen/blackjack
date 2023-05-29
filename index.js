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
        playerCards = []
        dealerCards = []
        card1 = getRandomCard(0)
        playerSum = card1
        card2 = getRandomCard(playerSum)
        playerSum += card2
        playerCards.push(card1, card2)
        dealerCards.push(getRandomCard(0))
        dealerSum = dealerCards[0]

         renderGame()
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
    } else if (playerSum === 21 && playerCards.length === 2) {
        isAlive = false
        messageEl.textContent = "Blackjack, 1.5 times your money back"
    } else if (playerSum === 21) {
        messageEl.textContent = "Dealer playing"
        dealerTurn()
    } else {
        messageEl.textContent = "New card?"
    }
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let newCard = getRandomCard(playerSum)
        playerCards.push(newCard)
        playerSum += newCard
        if (playerSum > 21) {
            for (let i = 0; i < playerCards.length; i++) {
                if (playerCards[i] === 11) {
                    playerCards[i] = 1
                    playerSum -= 10
                }
            }
        }
        renderGame()
    }
}

async function dealerTurn() {
    if (isAlive === true) {
        isAlive = false
        while (dealerSum <= playerSum && dealerSum < 17) {
            messageEl.textContent = "Dealer playing"
            await wait(1000);
            let newCard = getRandomCard(dealerSum)
            dealerCards.push(newCard)
            dealerSum += newCard
            if (dealerSum > 21) {
                for (let i = 0; i < dealerCards.length; i++) {
                    if (dealerCards[i] === 11) {
                        dealerCards[i] = 1
                        dealerSum -= 10
                    }
                }
            }
            renderGame()
        }
        if (dealerSum > 21) {
            messageEl.textContent = "Dealer busts, you won"
        } else if (dealerSum > playerSum) {
            messageEl.textContent = "Dealer wins"
        } else if (dealerSum === playerSum) {
            messageEl.textContent = "Stand off, money back"
        } else {
            messageEl.textContent = "You win"
        }
    }
}

function getRandomCard(sum) {
    let randomNumber = Math.ceil(Math.random() * 13)
    if (randomNumber === 1 && sum + 11 <= 21) {
        return 11
    } else if (randomNumber === 1 && sum + 11 > 21) {
        return 1
    } else if (randomNumber >= 10) {
        return 10
    } else {
        return randomNumber
    }
}

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(()=> {resolve('')}, ms);
    })
}
