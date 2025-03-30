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

// Start the game
async function startGame() {
  try {
    const cards = await loadCards(); // ✅ Wait for cards to load
    console.log("Total Cards Loaded:", cards.length);

    console.log("\nChoose a card to use:");
    cards.forEach((card, index) => {
      console.log(`${index + 1}: ${card.name} - Type: ${card.type} - Attack: ${"attack" in card ? card.attack : "N/A"}`);
    });

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
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

// Run the game
startGame();
