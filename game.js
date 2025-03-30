"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var readlineSync = require("readline-sync");
var enemy = {
    name: "Dark Golem",
    health: 20,
};
// Available cards for the player to choose from
var cards = [models_1.fireDragon, models_1.healingSpell, models_1.magicShield];
// Function to display card details
function displayCards() {
    console.log("\nChoose a card to use:");
    cards.forEach(function (card, index) {
        console.log("".concat(index + 1, ": ").concat(card.name, " - Type: ").concat(card.type, " - Attack: ").concat("attack" in card ? card.attack : "N/A"));
    });
}
// Function to handle player's turn
function playerTurn() {
    displayCards();
    var choice = readlineSync.questionInt("\nEnter the number of your chosen card: ") - 1;
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
