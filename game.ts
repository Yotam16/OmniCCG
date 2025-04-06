import { loadCards } from "./loadCards";
import * as readlineSync from "readline-sync";

interface Enemy {
  name: string;
  health: number;
}

interface Player {
  mana: number;
  deck: any[];
  hand: any[];
}

const MAX_MANA = 10;

let enemy: Enemy = {
  name: "Dark Golem",
  health: 100,
};

let player: Player = {
  mana: MAX_MANA,
  deck: [],
  hand: [],
};

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

function drawCard() {
  if (player.deck.length > 0) {
    const card = player.deck.pop();
    player.hand.push(card);
  }
}

async function startGame() {
  try {
    const allCards = await loadCards();
    player.deck = shuffle(allCards).slice(0, 10);
    player.hand = [];
    for (let i = 0; i < 3; i++) drawCard();

    console.log("Battle Start!");

    while (enemy.health > 0 && player.hand.length > 0) {
      console.log(`\nEnemy Health: ${enemy.health}`);
      console.log(`Your Mana: ${player.mana}`);
      console.log("\nYour Hand:");

      player.hand.forEach((card, index) => {
        console.log(`${index + 1}: ${card.name} (Type: ${card.type}, Cost: ${card.cost}, Attack: ${card.attack ?? "N/A"})`);
      });

      let choice = (readlineSync.questionInt("\nChoose a card to play: ") ?? 1) - 1;

      if (choice >= 0 && choice < player.hand.length) {
        let chosenCard = player.hand[choice];

        if (chosenCard.cost > player.mana) {
          console.log("Not enough mana!");
        } else {
          player.mana -= chosenCard.cost;

          console.log(`\nYou played: ${chosenCard.name}`);

          if ("attack" in chosenCard && chosenCard.attack > 0) {
            enemy.health -= chosenCard.attack;
            console.log(`It dealt ${chosenCard.attack} damage!`);
          } else {
            console.log("This card had no attack.");
          }

          player.hand.splice(choice, 1); // Remove used card
          drawCard(); // Draw new one
        }
      } else {
        console.log("Invalid choice.");
      }

      player.mana = Math.min(player.mana + 1, MAX_MANA); // Gain mana
    }

    console.log(enemy.health <= 0 ? "\nYou Win!" : "\nOut of cards! You lose.");
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

startGame();
