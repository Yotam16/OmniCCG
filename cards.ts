import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";
import { CreatureCard, SpellCard, ArtifactCard, CardType, Rarity, Faction } from "./models";

// Read and parse the XML file
const xmlData = fs.readFileSync("cards.xml", "utf-8");
const parser = new XMLParser();
const jsonData = parser.parse(xmlData);

// Convert XML data into TypeScript objects
export const allCards = jsonData.cards.card.map((card: any) => {
    let baseCard = {
        id: card.id,
        name: card.name,
        type: card.type as CardType,
        cost: parseInt(card.cost),
        rarity: card.rarity as Rarity,
        faction: card.faction as Faction,
        text: card.text || "",
    };

    if (card.type === "Creature") {
        return {
            ...baseCard,
            attack: parseInt(card.attack),
            health: parseInt(card.health),
            defence: parseInt(card.defence),
            mana: parseInt(card.mana),
            abilities: card.abilities?.ability || [],
            buffs: card.buffs?.buff || [],
        } as CreatureCard;
    } else if (card.type === "Spell") {
        return {
            ...baseCard,
            mana: parseInt(card.mana),
            buffs: card.buffs?.buff || [],
            abilities: card.abilities?.ability || [],
        } as SpellCard;
    } else if (card.type === "Artifact") {
        return {
            ...baseCard,
            passive: card.passive === "true",
            durability: parseInt(card.durability),
            bonusStats: card.bonusStats?.stat || [],
            attack: parseInt(card.attack),
            defence: parseInt(card.defence),
            mana: parseInt(card.mana),
            buffs: card.buffs?.buff || [],
            abilities: card.abilities?.ability || [],
        } as ArtifactCard;
    }

    return baseCard;
});
