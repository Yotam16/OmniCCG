import * as fs from "fs";
import * as xml2js from "xml2js";
import { CardType, Rarity, CreatureCard, SpellCard, ArtifactCard } from "./models";

// Read XML and return a promise
export function loadCards(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        fs.readFile("cards.xml", "utf-8", (err, data) => {
            if (err) {
                reject("Error reading XML file: " + err);
                return;
            }

            xml2js.parseString(data, (err, result) => {
                if (err) {
                    reject("Error parsing XML: " + err);
                    return;
                }

                if (!result.cards || !result.cards.card) {
                    reject("Invalid XML structure");
                    return;
                }

                const allCards = result.cards.card.map((card: any) => ({
                    id: card.id[0],
                    name: card.name[0],
                    type: card.type[0] as CardType,
                    cost: Number(card.cost[0]),
                    rarity: card.rarity[0] as Rarity,
                    attack: card.attack ? Number(card.attack[0]) : 0,
                    health: card.health ? Number(card.health[0]) : 0,
                    mana: card.mana ? Number(card.mana[0]) : 0,
                    buffs: card.buffs ? card.buffs[0].split(",") : [],
                }));

                resolve(allCards);
            });
        });
    });
}
