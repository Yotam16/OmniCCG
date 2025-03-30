import { CreatureCard, SpellCard, ArtifactCard, CardType, Rarity, Faction } from "./models";

export const fireDragon: CreatureCard = {
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

export const healingSpell: SpellCard = {
  id: "002",
  name: "Healing Light",
  type: CardType.Spell,
  cost: 3,
  rarity: Rarity.Rare,
  faction: Faction.Light,
  attack: 0, 
  mana: 2,
  abilities: ["Heal"],
  buffs: ["Restore 5 health to all allies"],
};


export const magicShield: ArtifactCard = {
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

export const allCards = [fireDragon, healingSpell, magicShield];
