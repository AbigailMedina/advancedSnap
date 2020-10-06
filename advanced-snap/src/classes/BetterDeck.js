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
	get deckCards(){
		var oldDeckCards = this.deck.draw(this.deck.remainingLength)
		console.log("oldDeckCards",oldDeckCards)
		this.deck = new Deck(oldDeckCards)
		console.log("deck copy",this.deck)
		return [oldDeckCards,this.deck];
	}
}
exports.BetterDeck =BetterDeck;