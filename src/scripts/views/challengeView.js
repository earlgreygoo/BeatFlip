import React from 'react'
import ACTIONS from '../ACTIONS'
import Header from './header'
import STORE from '../STORE'
import User from '../models/userModel'






var currentDate = new Date();

console.log(currentDate)

const ChallengeView = React.createClass({


	componentWillMount: function() {
		ACTIONS.fetchCurrentChallenge(this.props.id)
		ACTIONS.fetchTracks(this.props.id)
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
		console.log(this.props)
		return (
			<div className='challenge-page'>
				<Header />
				<ChallengeDetails model={this.state.currentChallenge} /> 
				<Submit visible={this.state.submissionWindowVisible} />
				<Tracks collection={this.state.currentTracks} e />

			</div>
			)
	}
})


const ChallengeDetails = React.createClass({

	_toggleSubmit: function() {
		this.setState(
			STORE._set({
				submissionWindowVisible: !(STORE._get('submissionWindowVisible'))
			}))

	},


	render: function() {
		var challenge = this.props.model
		console.log(challenge)
		return (
			<div className='details-container'>
				<h1> {challenge.get('title')} </h1>
				<p> {challenge.get('details')} </p>
				<button onClick={this._toggleSubmit}> Submit a Track! </button> 
				<TimeRemaining deadline={challenge.get('deadline')} />
			</div>
			)
	}
})

const TimeRemaining = React.createClass({

	render: function() {
		return (
		<div> stuff	</div>
		)
	}
})

const Submit = React.createClass({

		_submitTrack: function(eventObj) {
			eventObj.preventDefault()

			var trackInfo = {
				title:    		eventObj.target.title.value,  
				link:     		eventObj.target.URL.value,
				description:    (eventObj.target.description.value ? eventObj.target.description.value : ""),
				challengeId:    "",
				votes:          0
			}

			ACTIONS.submitTrack(trackInfo)

		},

	

		render: function() {


			var	displayStyle = {
				display: (this.props.visible ? "block" : "none")
		    }


			console.log(this.props.visible)

			return (
				
				<form className='submission-container' style={displayStyle} onSubmit={this._submitTrack}>
					<h2>Post your stuff</h2>
					<input type="title" 	   name="title" 	   placeholder="title" />
					<input type="text" 	       name="URL" 		   placeholder="track link" />
					<input type="description"  name="description"  placeholder="description (optional)" />
					<button type="submit"> Submit </button> 
				</form>
				
				)
		}
	
})

			
const Tracks = React.createClass({


	render: function() {
		return (
			<div className='tracks-container'>
			{this.props.collection.map(track=> <Track model={track} />)}
			</div>
			)
	}
})

const Track = React.createClass({

	_vote4: function(e) {
		if(!User) {
			alert('please login to vote')
		}
		else if (User) {
			console.log(this.props.model.get('_id'))
			var thisUser = User.getCurrentUser()
			thisUser.saveVote(this.props.model.get('_id'),)

		}

	},

	_checkCheck: function(e) {
	},

	render: function() {


		return (
			<div className='track'> 
				<h2> {this.props.model.attributes.title} </h2>
				<a href={this.props.model.attributes.link}> check it out! </a>
				<div className= 'vote-box'>
					<input type='checkbox' onClick={this._vote4} />
				</div>
			</div>
			)
	}
})




export default ChallengeView