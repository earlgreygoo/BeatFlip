import React from 'react'
import ACTIONS from '../ACTIONS'
import Header from './header'
import STORE from '../STORE'
import User from '../models/userModel'



window.User = User


const HomeView = React.createClass({


	componentWillMount: function() {
		ACTIONS.fetchChallenges()
		STORE.on('storeChanged', ()=>{
			this.setState(
				STORE._getData()
			)
		})
	},

	componentWillUnmount: function() {
		STORE.off()
	},

	getInitialState: function() {
		return STORE._getData()
	},
	render: function() {
		console.log(this.state)
		return (
			<div className="home">
				<Header />
				<Challenges collection={this.state.challengeCollection} />
			</div>
			)
	}
})

const Challenges = React.createClass({
	

	render: function() {
		console.log(this.props.collection)
		return (
			<div className="challenges-container">
				<div className="active"> Active Challenges 
					{this.props.collection.filter((model)=> model.attributes.isActive).map(challengeModel=> <Challenge model={challengeModel} />)}
				</div> 

				<div className="inactive"> Challenges that are no longer active, but you can still check 'em out if youl'd like to 
					{this.props.collection.filter((model)=> !model.attributes.isActive).map(challengeModel=> <Challenge model={challengeModel} />)}
				</div>
			</div>

			)
	}
})

const Challenge = React.createClass({
	
	render: function() {
		var thisChallenge = this.props.model.attributes
		console.log("rendering challenge", this.props)

		return (
			<div className="challenge" onClick={()=> location.hash = "challenges/" + thisChallenge._id}>
				<h1> {thisChallenge.title} </h1> 

			</div>
		)
	}
})




export default HomeView