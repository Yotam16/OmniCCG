import { loadCards } from "./loadCards";

async function startGame() {
    try {
        const cards = await loadCards(); // Wait for XML to load
        console.log("Total Cards Loaded:", cards.length);
        console.log(cards);
    } catch (error) {
        console.error(error);
    }
}

startGame();
