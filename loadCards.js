"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCards = loadCards;
var fs = require("fs");
var xml2js = require("xml2js");
// Read XML and return a promise
function loadCards() {
    return new Promise(function (resolve, reject) {
        fs.readFile("cards.xml", "utf-8", function (err, data) {
            if (err) {
                reject("Error reading XML file: " + err);
                return;
            }
            xml2js.parseString(data, function (err, result) {
                if (err) {
                    reject("Error parsing XML: " + err);
                    return;
                }
                if (!result.cards || !result.cards.card) {
                    reject("Invalid XML structure");
                    return;
                }
                var allCards = result.cards.card.map(function (card) { return ({
                    id: card.id[0],
                    name: card.name[0],
                    type: card.type[0],
                    cost: Number(card.cost[0]),
                    rarity: card.rarity[0],
                    attack: card.attack ? Number(card.attack[0]) : 0,
                    health: card.health ? Number(card.health[0]) : 0,
                    mana: card.mana ? Number(card.mana[0]) : 0,
                    buffs: card.buffs ? card.buffs[0].split(",") : [],
                }); });
                resolve(allCards);
            });
        });
    });
}
