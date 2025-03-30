"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireDragonInGame = exports.magicShield = exports.healingSpell = exports.fireDragon = exports.Faction = exports.Rarity = exports.CardType = void 0;
// Enum for card types
var CardType;
(function (CardType) {
    CardType["Creature"] = "Creature";
    CardType["Spell"] = "Spell";
    CardType["Artifact"] = "Artifact";
    CardType["Action"] = "Action";
    CardType["Event"] = "Event";
})(CardType || (exports.CardType = CardType = {}));
// Enum for rarity
var Rarity;
(function (Rarity) {
    Rarity["Common"] = "Common";
    Rarity["Uncommon"] = "Uncommon";
    Rarity["Rare"] = "Rare";
    Rarity["Epic"] = "Epic";
    Rarity["Legendary"] = "Legendary";
})(Rarity || (exports.Rarity = Rarity = {}));
var Faction;
(function (Faction) {
    Faction["Fire"] = "Fire";
    Faction["Water"] = "Water";
    Faction["Earth"] = "Earth";
    Faction["Light"] = "Light";
    Faction["Dark"] = "Dark";
})(Faction || (exports.Faction = Faction = {}));
// cards 
exports.fireDragon = {
    id: "001",
    name: "Fire Dragon",
    type: CardType.Creature,
    cost: 5,
    rarity: Rarity.Legendary,
    faction: Faction.Fire,
    attack: 7,
    health: 6,
    defence: 3,
    mana: 2,
    abilities: ["Flying", "Burn"],
    buffs: ["Fire Shield"],
};
exports.healingSpell = {
    id: "002",
    name: "Healing Light",
    type: CardType.Spell,
    cost: 3,
    rarity: Rarity.Rare,
    faction: Faction.Light,
    attack: 0, // No attack value for healing spell
    mana: 2,
    abilities: ["Heal"],
    buffs: ["Restore 5 health to all allies"],
};
exports.magicShield = {
    id: "003",
    name: "Magic Shield",
    type: CardType.Artifact,
    cost: 2,
    rarity: Rarity.Epic,
    passive: true,
    durability: 3,
    bonusStats: ["+2 Defense to equipped creature"],
    health: 0, // No health effect
    attack: 0, // No attack effect
    defence: 2, // Adds defense
    mana: 0, // No mana effect
    buffs: ["Reflect Damage"],
    abilities: ["Absorb First Attack"],
};
// Example GameplayCard Instance
exports.fireDragonInGame = {
    baseCard: exports.fireDragon, // Reference to the base definition
    instanceId: "game-001-01", // Unique instance ID
    currentHealth: 6,
    currentAttack: 7,
    isExhausted: false,
    isOnBoard: true,
    statusEffects: ["Burning"],
};
