import { loadCards } from "./loadCards";
import * as readlineSync from "readline-sync";

interface Enemy {
  name: string;
  health: number;
}

let enemy: Enemy = {
  name: "Dark Golem",
  health: 100,
};

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

async function startGame() {
  try {
    const allCards = await loadCards();
    console.log("Total Cards Loaded:", allCards.length);

    let deck = shuffle(allCards).slice(0, 20);
    let hand = deck.splice(0, 3);

    while (enemy.health > 0 && (hand.length > 0 || deck.length > 0)) {
      console.log(`\nEnemy Health: ${enemy.health}`);
      console.log("\nChoose a card to use:");

      hand.forEach((card, index) => {
        console.log(`${index + 1}: ${card.name} - Type: ${card.type} - Attack: ${"attack" in card ? card.attack : "N/A"}`);
      });

      let choice = (readlineSync.questionInt("\nEnter the number of your chosen card: ") ?? 1) - 1;

      if (choice >= 0 && choice < hand.length) {
        const chosenCard = hand.splice(choice, 1)[0];
        console.log(`\nYou played: ${chosenCard.name}`);

        if ("attack" in chosenCard && chosenCard.attack > 0) {
          enemy.health -= chosenCard.attack;
          console.log(`${chosenCard.name} dealt ${chosenCard.attack} damage!`);
        } else {
          console.log(`${chosenCard.name} has no attack power.`);
        }

        if (deck.length > 0) {
          const newCard = deck.shift();
          if (newCard) hand.push(newCard);
        }
      } else {
        console.log("Invalid choice!");
      }
    }

    if (enemy.health <= 0) {
      console.log("\nEnemy Defeated! Victory!");
    } else {
      console.log("\nNo more cards left! You Lose!");
    }
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

startGame();
