"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var cards_1 = require("./cards");
var enemy = {
    name: "Dark Golem",
    health: 20,
};
// card list
var cards = cards_1.allCards;
// display card
function displayCards() {
    console.log("\nChoose a card to use:");
    cards.forEach(function (card, index) {
        console.log("".concat(index + 1, ": ").concat(card.name, " - Type: ").concat(card.type, " - Attack: ").concat("attack" in card ? card.attack : "N/A"));
    });
}
// player's turn
function playerTurn() {
    var _a;
    console.log("Total Cards Loaded:", cards.length);
    displayCards();
    var choice = ((_a = readlineSync.questionInt("\nEnter the number of your chosen card: ")) !== null && _a !== void 0 ? _a : 1) - 1;
    if (choice >= 0 && choice < cards.length) {
        var chosenCard = cards[choice];
        console.log("\nYou chose: ".concat(chosenCard.name));
        if ("attack" in chosenCard && chosenCard.attack > 0) {
            enemy.health -= chosenCard.attack;
            console.log("".concat(chosenCard.name, " dealt ").concat(chosenCard.attack, " damage to ").concat(enemy.name, "!"));
        }
        else {
            console.log("".concat(chosenCard.name, " has no attack power."));
        }
        console.log("\nEnemy Health: ".concat(enemy.health <= 0 ? "Defeated!" : enemy.health));
    }
    else {
        console.log("Invalid choice!");
    }
}
// Run the game
playerTurn();
