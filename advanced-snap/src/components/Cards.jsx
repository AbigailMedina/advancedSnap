import React, { Component } from 'react'
import { Columns, Container } from 'react-bulma-components'
// import Snappable from '../classes/Snappable';
const {Snappable} = require('../classes/Snappable')
const { decks, Deck } = require('cards');


// keep up the good work Abby! <3

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
			tmpPlayers.push({
				"deck":new Deck(drawn),
			 	"pname": "Player"+i,
			 	"dead":false

			 })
		}
		tmpPlayers[0].turn=true;
		this.setState({players:tmpPlayers, discardDeck:discardDeck, whoseTurn:0})
		console.log("setUpPlayerDecks cards",numPlayers, tmpPlayers)

	}

	killPlayer(player){
		player.dead=true
		this.updatePlayers(player);
		console.log("killPlayer",this.state.players)	
	}
	/*
	draw a card from players deck, add it to the discard deck
	*/
	draw(player){
		if(!player.turn){
			player.stupid=true
			this.updatePlayers(player)
		}else{
			this.updateTurns(player)
		}
		if(player.deck.remainingLength<1){
			this.killPlayer(player);return;
		}
		var drawnCard = player.deck.draw()
		var currentDiscardDeck = this.state.discardDeck
		currentDiscardDeck.add(drawnCard)
		this.setState({discardDeck:currentDiscardDeck})
		// this.state.discardDeck.add(drawnCard)
		this.setState({
			topCard:drawnCard,
			topCardOwner:player.pname
		})
	}
	updateTurns(player){
		var currTurn = this.state.whoseTurn;
		var currPlayer = this.state.players[currTurn].turn=false;
		var turnMath = (currTurn+1)%this.props.howManyPlayers;
		// console.log(currTurn,turnMath);
		var nextPlayer = this.state.players[turnMath].turn=true;
		this.updatePlayers(currPlayer);
		this.updatePlayers(nextPlayer);
		this.setState({whoseTurn:turnMath})
	}

	updatePlayers(player){
		const newPlayers = this.state.players.map(p=>{ 
			if (p.pname===player.pname){
				return player;
			}else{
				return p;
			}
		})
		this.setState({players:newPlayers})
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
		const snap = new Snappable(this.state.discardDeck)
		console.log("snappable?",snap.snappable())
	}
	displayTopCard(){
		var ret="ret"
		if(!this.state.topCard){
			return '/backofplayingcard.jpg'
		}else if(this.state.topCard[0].rank && this.state.topCard[0].suit){
			var rank = this.state.topCard[0].rank.shortName.toUpperCase()
			var suit = this.state.topCard[0].suit.name.charAt(0).toUpperCase()
			ret='/'+rank+suit+'.jpg'
			console.log("ret",ret)
			return ret
		}else{
			console.log()
			console.log("ret1",ret)}
		

	}
	render() {
	  	return (
	  		<div>
	  			<div>
	  				{this.state.topCard.toString()}
	  				{this.state.topCardOwner}
	  				{this.displayTopCard()}
					 <figure className="image is-4x5 cardImage">
						<img alt="backofplayingcard" src={this.displayTopCard()} onClick={()=>{this.snap()}}></img>
					</figure>
	  			</div>
	  			<Container>
	  			<Columns>
	  			{
	  				this.state.players.map(
		  				(player) =>
		  				{return(
		  					<Columns.Column disabled={!player.turn} onClick={()=>{this.draw(player)}} key={player.pname}>
			  					<div>{player.pname}</div>
			  					{player.stupid?<div>stupid</div>:<div></div>}
			  					{player.turn?<div>your turn</div>:<div>not your turn</div>}

			  					{player.dead?
			  						<div>
				  						<figure className="image is-4x5 cardImage">
					  						<img alt="deadcard" src="/deadcard.jpg"></img>
				  						</figure>"Out of Cards - Snap the next Snappable or you lose!"
			  						</div>:
			  						<figure disabled={!player.turn} className="image is-4x5 cardImage">
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