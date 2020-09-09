const { Deck } = require('cards');
const {BetterDeck} = require('./BetterDeck')

class Snappable {
	constructor(deck) {
		this.deck = deck;
		this.royals = ['J','Q','K']
	}
	topX(x){
		// var deckCopy = new Deck(this.deck.deck)
		// console.log("topx",this.deck.deckCards,deckCopy,this.deck)
		// // this.deck.discardAllHeld()
		// return this.deck.draw(x);
		var betterDeck = new BetterDeck(this.deck);
		var topCards = betterDeck.getDeckCards()
		console.log("topX, topCards:",topCards)
		return topCards
	}

	snappable() {
		/*if top 3 cards is snappable return true*/
		if(this.deck.remainingLength>=1){
			//check for 10
			var topOneCards = this.topX(1)
			if(this.tenRule(topOneCards)){
				return true
			}
		}if(this.deck.remainingLength >= 2){
			//check for basic, 10, joker
			//TODO Joker
			var topTwoCards = this.topX(2)
			if(this.tenRule(topTwoCards) || this.basicRule(topTwoCards)){
				return true
			}
		}if(this.deck.remainingLength >= 3){
			//check for sandwich
			var topThreeCards = this.topX(3)
			if(this.sandwichRule(topThreeCards)){
				return true
			}
		}
		// this.stupidCard()//0 cards
		return false
		
	}

	
	basicRule(topCards){
		console.log("basicRule")

		//need at least two cards
		if(topCards.length>1 && 
			this.rankFetch(topCards,1)===this.rankFetch(topCards,2)){
			return true
		}else{
			return false
		}

	}
	tenRule(topCards){
		console.log("tenRule:")
		if(this.rankFetch(topCards,1) === "10"){
			return true
		}if(topCards.length>1 ){ 
			console.log(this.rankFetch(topCards,1),this.rankFetch(topCards,2))
			if(this.rankFetch(topCards,1)+this.rankFetch(topCards,2) === "10"){
				return true
			}
		}else{
			console.log(this.rankFetch(topCards,1))

			return false
		}
	}
	sandwichRule(topCards){
		console.log("sandwichRule")

		//need at least 3 cards
		if(topCards.length>=2 && 
			this.rankFetch(topCards,1)===this.rankFetch(topCards,3)){
			return true
		}else{return false}
	}
	rankFetch(cards,index){
		return cards.slice(index-1,index)[0][0].rank.shortName
	}
}

exports.Snappable = Snappable;