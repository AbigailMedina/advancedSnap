import React, { Component } from 'react'
import { Columns, Container } from 'react-bulma-components'
const { decks, Deck } = require('cards');

class Cards extends Component {
	constructor(props) {
	    super(props);
	    //cant change props, though can access with this.props.howMany
	    const deck = new decks.StandardDeck({ jokers: 2 });
	    deck.shuffleAll()
	    this.state = {
	    	baseDeck: deck,
	    	topCard:"null topCard",
	    	topCardOwner:"null topCardOwner",
	    	players:[]
	    }
	}
	componentDidMount(){
		
		var deckLength = this.state.baseDeck.totalLength;
		var numPlayers = this.props.howManyPlayers;
		var tmpPlayers = [];
		var drawn = {}
		console.log("componentDidMount cards",numPlayers)
		for(var i = 0 ; i < numPlayers ; i++){
			drawn = this.state.baseDeck.draw(deckLength/numPlayers)
			//need to push deck: Deck(drawn) not just drawn
			tmpPlayers.push({"deck":drawn, "pname": "Player"+i})
		}
		this.setState({players:tmpPlayers})
	}
	componentDidUpdate(prevProps){
		if(prevProps.howManyPlayers!=this.props.howManyPlayers){
			var deck = new decks.StandardDeck({ jokers: 2 });
			var deckLength = deck.totalLength;
			var numPlayers = this.props.howManyPlayers;
			var tmpPlayers = [];
			var drawn = {}
			console.log("componentDidUpdate cards",numPlayers)
			for(var i = 0 ; i < numPlayers ; i++){
				drawn = deck.draw(deckLength/numPlayers)
				//need to push deck: Deck(drawn) not just drawn
				tmpPlayers.push({"deck":drawn, "pname": "Player"+i})
			}
			this.setState({players:tmpPlayers,baseDeck:deck})
		}
	}

	draw(player){
		var drawnCard = player.deck.draw().toString()
		this.setState({
			topCard:drawnCard,
			topCardOwner:player.pname
		})
	}
	render() {
	  	return (
	  		<div>
	  			<div onClick={()=>{console.log(this.state.players)}}>
	  				{this.state.topCard}
	  			</div>
	  			<Container>
	  			<Columns>
	  			{
	  				this.state.players.map(
		  				(player) =>
		  				{return(
		  					<Columns.Column>
			  					<div>{player.pname}</div>
			  					<figure class="image is-4x5 cardImage">
			  						<img alt="backofplayingcard" src="/backofplayingcard.jpg" onClick={()=>{this.draw(player)}}></img>
		  						</figure>
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