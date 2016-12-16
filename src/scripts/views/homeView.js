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
		return (
			<div className="challenges-container">
				 <h4> Active Challenges </h4>
				<div className="active">
					{this.props.collection.filter((model)=> model.attributes.isActive).map(challengeModel=> <Challenge model={challengeModel} />)}
				</div> 
				<h4> Old Challenges </h4>
				<div className="inactive"> 
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
			
			<div className={thisChallenge.style} onClick={()=> location.hash = "challenges/" + thisChallenge._id}>
				<img src={'../images/paperBack.jpg'} className="paper" />
				<h1 className='challengeTitle'> {thisChallenge.title} </h1> 

			</div>
		
		)
	}
})




export default HomeView