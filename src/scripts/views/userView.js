import React from 'react'
import ACTIONS from '../ACTIONS'
import Header from './header'
import STORE from '../STORE'
import User from '../models/userModel'



window.User = User


const UserView = React.createClass({


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
			<div className="user">
				<Header />
				<Userinfo model={User.getCurrentUser()} />
				<SubmittedTracks model={User.getCurrentUser().attributes.submissions} />
			</div>
			)
	}
})

const Userinfo = React.createClass({


	render: function() {
		console.log(this.props.model)
		return (
			<div className="user">
				<h3> hi {this.props.model.attributes.email} </h3>
				<p> your current score is </p>
				<h4> {this.props.model.attributes.score}</h4>

			</div>
			)
	}
})


const SubmittedTracks = React.createClass({


	render: function() {
		return (
			<div className="submissionContainer">
				<h1> Submissions </h1> 
				<h3> {!this.props.model[0] ? "Looks Like you haven't submitted anything yet :( " : "" } </h3>
				

			</div>
			)
	}
})

export default UserView 


