import React, { Component } from 'react'
import { Columns, Container } from 'react-bulma-components'
const { decks, Deck } = require('cards');

class Cards extends Component {
	constructor(props) {
	    super(props);
	    //cant change props, though can access with this.props.howMany
	    
	    this.state = {
	    	discardDeck: {},//to keep track of possible snaps; top card is for display purposes
	    	topCard:"null topCard",
	    	topCardOwner:"null topCardOwner",
	    	players:[]
	    }
	}
	componentDidMount(){
		
		this.setUpPlayerDecks()
	}

	/*
	For handling change of num players at any point
	will reset hands
	*/
	componentDidUpdate(prevProps){
		if(prevProps.howManyPlayers!==this.props.howManyPlayers){
			this.setUpPlayerDecks()
		}
	}
	setUpPlayerDecks(){
		var discardDeck = new Deck();
		var deck = new decks.StandardDeck({ jokers: 2 });
		deck.shuffleAll()
		var deckLength = deck.totalLength;
		var numPlayers = this.props.howManyPlayers;
		var tmpPlayers = [];
		var drawn = {}
		for(var i = 0 ; i < numPlayers ; i++){
			drawn = deck.draw(deckLength/numPlayers)
			//need to push deck: Deck(drawn) not just drawn
			tmpPlayers.push({
				"deck":new Deck(drawn),
			 	"pname": "Player"+i,
			 	"dead":false
			 })
		}
		this.setState({players:tmpPlayers, discardDeck:discardDeck})
		console.log("setUpPlayerDecks cards",numPlayers, tmpPlayers)

	}

	killPlayer(player){
		player.dead=true

		const newPlayers = this.state.players.map(p=>{ 
			if (p.pname===player.pname){

				return player;
			}else{
				return p;
			}
		})
		console.log("killPlayer",newPlayers)
		this.setState({players:newPlayers})
		
	}
	/*
	draw a card from players deck, add it to the discard deck
	*/
	draw(player){
		if(player.deck.remainingLength<1){
			this.killPlayer(player);return;
		}
		var drawnCard = player.deck.draw()
		var currentDiscardDeck = this.state.discardDeck
		currentDiscardDeck.add(drawnCard)
		this.setState({discardDeck:currentDiscardDeck})
		this.state.discardDeck.add(drawnCard)
		this.setState({
			topCard:drawnCard.toString(),
			topCardOwner:player.pname
		})
	}
	snap(){
		/*
			if state.discardPile is snappable:
				drawnCards = draw all cards from discardPile
				player.deck.addToBottom(drawnCards)
			else add stupid card:
				drawnCard = draw 1 card from top of player.deck
				state.discardPile.addToBottom(drawnCard)
		*/
		console.log("snapped?")
	}
	render() {
	  	return (
	  		<div>
	  			<div>
	  				{this.state.topCard}
	  				{this.state.topCardOwner}
					 <figure className="image is-4x5 cardImage">
						<img alt="backofplayingcard" src="/backofplayingcard.jpg" onClick={()=>{this.snap()}}></img>
					</figure>
	  			</div>
	  			<Container>
	  			<Columns>
	  			{
	  				this.state.players.map(
		  				(player) =>
		  				{return(
		  					<Columns.Column onClick={()=>{this.draw(player)}} key={player.pname}>
			  					<div>{player.pname}</div>
			  					{player.dead?
			  						<div>
				  						<figure className="image is-4x5 cardImage">
					  						<img alt="deadcard" src="/deadcard.jpg"></img>
				  						</figure>"Out of Cards - Snap the next Snappable or you lose!"
			  						</div>:
			  						<figure className="image is-4x5 cardImage">
				  						<img alt="backofplayingcard" src="/backofplayingcard.jpg" ></img>
			  						</figure>
			  					}
		  						<div>num cards left: {player.deck.remainingLength}</div>
		  					</Columns.Column>
		  				)}
	  				)
		  		
	  			}</Columns>
	  			</Container>
	    	</div>


	    )
  	}
}

export default Cards;