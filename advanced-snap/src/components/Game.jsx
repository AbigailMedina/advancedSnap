import React, { Component } from 'react'
import { Columns, Container } from 'react-bulma-components'
import SelectPlayers from './SelectPlayers'
import Cards from './Cards'

class Game extends Component {
	constructor(props) {
	    super(props);
	    //cant change props, though can access with this.props.howMany
	    this.state = {
	    	numPlayers:2
	    }
	}
	componentDidMount(){
		
	}
	
	setNumPlayers(np){
		console.log("Game setNumPlayers",np)
		this.setState({numPlayers:np})
	}
	
	render() {
		return(
		<div>
		  	<SelectPlayers selectedPlayers={this.setNumPlayers.bind(this)}></SelectPlayers>
	      	<Cards howManyPlayers={this.state.numPlayers}></Cards>
		</div>)

	    
  	}
}

export default Game;