import React, { Component } from 'react'

class Cards extends Component {
	constructor(props) {
	    super(props);
	    //cant change this. can access with this.props.howMany
	    
	    this.state = {
	    	howMany:0
	    }
	}
	componentDidMount(){
		this.setState({howMany:this.props.howMany})
	}

	doSomething(){
		this.setState({howMany:1})
		this.props.click()
		//dont ever do this.state.howMany=1, it wont do anything
	}
	render() {
	  	return (
	  		<div>
		  		<div>Im a card {this.props.howMany}</div>
		  		<div onClick={(evt)=>{this.doSomething()}}>click me </div>
		  		<div>{this.state.howMany}</div>
	    	</div>
	    )
  	}
}

export default Cards;