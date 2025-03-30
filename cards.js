"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allCards = void 0;
var fs = require("fs");
var fast_xml_parser_1 = require("fast-xml-parser");
// Read and parse the XML file
var xmlData = fs.readFileSync("cards.xml", "utf-8");
var parser = new fast_xml_parser_1.XMLParser();
var jsonData = parser.parse(xmlData);
// Convert XML data into TypeScript objects
exports.allCards = jsonData.cards.card.map(function (card) {
    var _a, _b, _c, _d, _e, _f, _g;
    var baseCard = {
        id: card.id,
        name: card.name,
        type: card.type,
        cost: parseInt(card.cost),
        rarity: card.rarity,
        faction: card.faction,
        text: card.text || "",
    };
    if (card.type === "Creature") {
        return __assign(__assign({}, baseCard), { attack: parseInt(card.attack), health: parseInt(card.health), defence: parseInt(card.defence), mana: parseInt(card.mana), abilities: ((_a = card.abilities) === null || _a === void 0 ? void 0 : _a.ability) || [], buffs: ((_b = card.buffs) === null || _b === void 0 ? void 0 : _b.buff) || [] });
    }
    else if (card.type === "Spell") {
        return __assign(__assign({}, baseCard), { mana: parseInt(card.mana), buffs: ((_c = card.buffs) === null || _c === void 0 ? void 0 : _c.buff) || [], abilities: ((_d = card.abilities) === null || _d === void 0 ? void 0 : _d.ability) || [] });
    }
    else if (card.type === "Artifact") {
        return __assign(__assign({}, baseCard), { passive: card.passive === "true", durability: parseInt(card.durability), bonusStats: ((_e = card.bonusStats) === null || _e === void 0 ? void 0 : _e.stat) || [], attack: parseInt(card.attack), defence: parseInt(card.defence), mana: parseInt(card.mana), buffs: ((_f = card.buffs) === null || _f === void 0 ? void 0 : _f.buff) || [], abilities: ((_g = card.abilities) === null || _g === void 0 ? void 0 : _g.ability) || [] });
    }
    return baseCard;
});
