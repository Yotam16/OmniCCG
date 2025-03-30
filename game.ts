import { fireDragon, healingSpell, magicShield, CreatureCard, SpellCard, ArtifactCard } from "./models";
import * as readlineSync from "readline-sync";
import { allCards } from "./cards";


interface Enemy {
  name: string;
  health: number;
}

let enemy: Enemy = {
  name: "Dark Golem",
  health: 20,
};

// card list
const cards = [fireDragon, healingSpell, magicShield];

// display card
function displayCards() {
  console.log("\nChoose a card to use:");
  cards.forEach((card, index) => {
    console.log(`${index + 1}: ${card.name} - Type: ${card.type} - Attack: ${"attack" in card ? card.attack : "N/A"}`);
  });
}

// player's turn
function playerTurn() {
  displayCards();

  let choice = (readlineSync.questionInt("\nEnter the number of your chosen card: ") ?? 1) - 1;

  if (choice >= 0 && choice < cards.length) {
    let chosenCard = cards[choice];
    console.log(`\nYou chose: ${chosenCard.name}`);

    if ("attack" in chosenCard && chosenCard.attack > 0) {
      enemy.health -= chosenCard.attack;
      console.log(`${chosenCard.name} dealt ${chosenCard.attack} damage to ${enemy.name}!`);
    } else {
      console.log(`${chosenCard.name} has no attack power.`);
    }

    console.log(`\nEnemy Health: ${enemy.health <= 0 ? "Defeated!" : enemy.health}`);
  } else {
    console.log("Invalid choice!");
  }
}

// Run the game
playerTurn();
