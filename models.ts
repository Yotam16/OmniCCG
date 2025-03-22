// Enum for card types
export enum CardType {
    Creature = "Creature",
    Spell = "Spell",
    Artifact = "Artifact",
    Action = "Action",
    Event = "Event",
  }
  
  // Enum for rarity
  export enum Rarity {
    Common = "Common",
    Uncommon = "Uncommon",
    Rare = "Rare",
    Epic = "Epic",
    Legendary = "Legendary",
  }
  
  export enum Faction {
    Fire = "Fire",
    Water = "Water",
    Earth = "Earth",
    Light = "Light",
    Dark = "Dark",
  }
  
  // Common card interface
  export interface BaseCard {
    id: string;
    name: string;
    type: CardType;
    cost: number;
    rarity: Rarity;
    faction?: Faction;
    text?: string;
  }
  
  // Creature Card Interface
  export interface CreatureCard extends BaseCard {
    health : number;
    attack : number;
    defence : number;
    mana : number;
    buffs?: string[];
    abilities?: string[];
  }
  
  // Spell Card Interface
  export interface SpellCard extends BaseCard {
    attack : number;
    mana : number;
    buffs?: string[];
    abilities?: string[];
  }
  
  // Artifact Card Interface
  export interface ArtifactCard extends BaseCard {
    passive : boolean;
    durability: number;
    bonusStats: string[];
    health : number; // health alterations such as heal, damage etc.
    attack : number;
    defence : number;
    mana : number;
    buffs?: string[];
    abilities?: string[];
  }
  
  // Union Type for All Cards
  export type Card = CreatureCard | SpellCard | ArtifactCard;


  export interface GameplayCard {
    baseCard: BaseCard;   // Pointer to static card data
    instanceId: string;   // Unique ID for this instance
    currentHealth?: number;
    currentAttack?: number;
    isExhausted?: boolean;
    isOnBoard?: boolean;
    statusEffects?: string[];
  }
  

  /////////////////////////////////////////////////////////////////////////////////////////
  const fireDragon: CreatureCard = {
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
  
  const healingSpell: SpellCard = {
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
  
  const magicShield: ArtifactCard = {
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
  const fireDragonInGame: GameplayCard = {
    baseCard: fireDragon, // Reference to the base definition
    instanceId: "game-001-01", // Unique instance ID
    currentHealth: 6,
    currentAttack: 7,
    isExhausted: false,
    isOnBoard: true,
    statusEffects: ["Burning"],
  };
  