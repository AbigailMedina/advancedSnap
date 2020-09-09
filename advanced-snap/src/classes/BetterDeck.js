const { Deck } = require('cards');

// BetterDeck.getDeckCards = function(deck){
// 	var oldDeckCards = deck.draw(deck.remainingLength)
// 	deck = new Deck(oldDeckCards)
// 	return oldDeckCards;
// }

class BetterDeck{
	constructor(deck){
		this.deck = deck
	}
	getDeckCards(){
		var oldDeckCards = this.deck.draw(this.deck.remainingLength)
		this.deck = new Deck(oldDeckCards)
		return oldDeckCards;
	}
}
exports.BetterDeck =BetterDeck;