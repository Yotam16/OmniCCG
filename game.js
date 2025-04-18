"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var loadCards_1 = require("./loadCards");
var readlineSync = require("readline-sync");
var enemy = {
    name: "Dark Golem",
    health: 20,
};
// Shuffle 
function shuffle(array) {
    return array.sort(function () { return Math.random() - 0.5; });
}
// Start the game
function startGame() {
    return __awaiter(this, void 0, void 0, function () {
        var allCards, deck, hand, choice, chosenCard, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, loadCards_1.loadCards)()];
                case 1:
                    allCards = _b.sent();
                    console.log("Total Cards Loaded:", allCards.length);
                    deck = shuffle(allCards).slice(0, 10);
                    console.log("Deck created with 10 random cards.");
                    hand = deck.slice(0, 3);
                    console.log("\nChoose a card to use from your hand:");
                    hand.forEach(function (card, index) {
                        console.log("".concat(index + 1, ": ").concat(card.name, " - Type: ").concat(card.type, " - Attack: ").concat("attack" in card ? card.attack : "N/A"));
                    });
                    choice = ((_a = readlineSync.questionInt("\nEnter the number of your chosen card: ")) !== null && _a !== void 0 ? _a : 1) - 1;
                    if (choice >= 0 && choice < hand.length) {
                        chosenCard = hand[choice];
                        console.log("\nYou chose: ".concat(chosenCard.name));
                        if ("attack" in chosenCard && chosenCard.attack > 0) {
                            enemy.health -= chosenCard.attack;
                            console.log("".concat(chosenCard.name, " dealt ").concat(chosenCard.attack, " damage to ").concat(enemy.name, "!"));
                        }
                        else {
                            console.log("".concat(chosenCard.name, " has no attack power."));
                        }
                        console.log("\nEnemy Health: ".concat(enemy.health <= 0 ? "Defeated!" : enemy.health));
                    }
                    else {
                        console.log("Invalid choice!");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error loading cards:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Run the game
startGame();
