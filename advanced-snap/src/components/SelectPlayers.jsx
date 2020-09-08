import React, { Component } from 'react'

class SelectPlayers extends Component {
	constructor(props) {
	    super(props);
	    //selectedPlayers
	    this.state = {
	    	numPlayers:0
	    }
	}
	componentDidMount(){
		
	}

	setNumPlayers(num){
		console.log("SelectPlayers setNumPlayers", num )
		this.props.selectedPlayers(num)
	}

	
	render() {
		return(
		<div>
		  	<div className="buttons">
		        <button className="button is-primary" onClick={()=>this.setNumPlayers(2)}>2 player</button>
		        <button className="button is-primary" onClick={()=>this.setNumPlayers(3)}>3 player</button>
		        <button className="button is-primary" onClick={()=>this.setNumPlayers(4)}>4 player</button>
		    </div>
	    </div>
	    )


	    
  	}
}

export default SelectPlayers;