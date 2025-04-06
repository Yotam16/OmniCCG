import { loadCards } from "./loadCards";
import * as readlineSync from "readline-sync";

interface Enemy {
  name: string;
  health: number;
}

let enemy: Enemy = {
  name: "Dark Golem",
  health: 20,
};

// Shuffle 
function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// Start the game
async function startGame() {
  try {
    const allCards = await loadCards();
    console.log("Total Cards Loaded:", allCards.length);

    const deck = shuffle(allCards).slice(0, 10);
    console.log("Deck created with 10 random cards.");

    const hand = deck.slice(0, 3);
    console.log("\nChoose a card to use from your hand:");
    hand.forEach((card, index) => {
      console.log(`${index + 1}: ${card.name} - Type: ${card.type} - Attack: ${"attack" in card ? card.attack : "N/A"}`);
    });

    let choice = (readlineSync.questionInt("\nEnter the number of your chosen card: ") ?? 1) - 1;

    if (choice >= 0 && choice < hand.length) {
      let chosenCard = hand[choice];
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
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

// Run the game
startGame();
