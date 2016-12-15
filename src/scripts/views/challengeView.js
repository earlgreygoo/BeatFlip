import React from 'react'
import ACTIONS from '../ACTIONS'
import Header from './header'
import STORE from '../STORE'
import User from '../models/userModel'
import Cassette from './cassette'



const ChallengeView = React.createClass({


	componentWillMount: function() {
		ACTIONS.fetchCurrentChallenge(this.props.id)
		ACTIONS.fetchTracks(this.props.id)
		STORE.on('storeChanged', ()=>{
			this.setState(
				STORE._getData()
			)
		})
		this._setUsersLikes()
		this._setActiveStatus()
	},

	componentWillUnmount: function() {
		STORE.off()
	},

	getInitialState: function() {
		return STORE._getData()
	},

	_setUsersLikes: function() { 
		if (User.getCurrentUser()) {
			var u = User.getCurrentUser()
			var votes = JSON.parse(u.get('tracksLiked'))
			STORE._set({
				userVotes: votes
			})
		}
	},

	_setActiveStatus: function() {
		if(this.state.currentChallenge.attributes.isActive) {
			STORE._set({
				activeStatus: true
			})
		}
		else {
			STORE._set({
				activeStatus: false,
			})
		}
	},


	render: function() {
		return (
			<div className='challenge-page'>
				<Header />
				<ChallengeDetails model={this.state.currentChallenge} /> 
				<Submit visible={this.state.submissionWindowVisible} id={this.props.id} />
				<Tracks collection={this.state.currentTracks} e />

			</div>
			)
	}
})


const ChallengeDetails = React.createClass({


	_toggleSubmit: function() {
		if (User.getCurrentUser()){
				STORE._set({
					submissionWindowVisible: !(STORE._get('submissionWindowVisible'))
			})
		}
		else {
			alert("Create an account to post a track")
		}

	},

	_winCheck: function() {
		var deadline = this.props.model.attributes.deadline
		var today = new Date().toISOString();
		console.log(deadline, today)
		if(deadline > today) {
			return 
		}
		else{
			return
		}

	},

	_activeCheck: function() {
		if(this.props.model.attributes.isActive){
			return true
		}
		else {

			return false
		}

	},

	_dateTranslate: function(isoString) {
		var dt = isoString.split(/[: T-]/).map(parseFloat);
     	var d = new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
    	var dateOut = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() 
    	console.log(dateOut, d)
     	return dateOut

	},




	render: function() {
		//this._winCheck()
		var challenge = this.props.model
		return (
			<div className='details-container well'>
				<h1> {challenge.get('title')} </h1>
				<p> {challenge.get('details')} </p>

				{this._activeCheck() ? 
						(<div> <h3> deadline: {this._dateTranslate(challenge.attributes.deadline)} </h3> <button id="mycrazybutt" onClick={this._toggleSubmit}> Submit a Track! </button> </div>)

						 : (<h3> won </h3>)}

				 
			</div>
			)
	}
})



const Submit = React.createClass({

		_toggleSubmit: function() {
			alert("aaah")
			this.setState(
				STORE._set({
					submissionWindowVisible: !(STORE._get('submissionWindowVisible'))
				}))

		},

		_submissionsCheck: function(eventObj) {
			eventObj.preventDefault()

			if (User.getCurrentUser()){

				var ChallId = this.props.id
				var subs = JSON.parse(User.getCurrentUser().get('submissions'))
				if (ChallId in subs) {				
					var quest = confirm("You can only submit one track per challenge. Do you wish to overwrite previously submmitted track? ")
					if (quest === true) {
						var track = subs[ChallId]
						ACTIONS.deleteTrack(track)
						this._submitTrack(eventObj)
					}
					else {
						this._toggleSubmit()
					}
				}
				else {
					this._submitTrack(eventObj)
				}
			}
			else {
				alert('you must have an account to post a track')
				this._toggleSubmit()
			}
		},

		_submitTrack: function(eventObj) {


			var trackInfo = {
				title:    		eventObj.target.title.value,
				userName:       user.getUser().attributes.username,
				link:     		eventObj.target.URL.value,
				description:    (eventObj.target.description.value ? eventObj.target.description.value : ""),
				challengeId:    this.props.id,
				votes:          0
			}
			ACTIONS.submitTrack(trackInfo,this.props.id)

			//.then((resp)=> Actions.saveSubmission(this.props.id, resp._id))
			//var u = User.getCurrentUser()
			//var promise = ACTIONS.submitTrack(trackInfo)
			//promise.then((resp) => {
			//	console.log(resp)
			//	Actions.saveSubmission(this.props.id, resp)
			//})
		},


		render: function() {


			var	displayStyle = {
				visibility: (this.props.visible ? "visible" : "hidden")
		    }



			return (
				<div className='submission-container' style={displayStyle}>
					<form className="track-form well" onSubmit={this._submissionsCheck}>
						<h2>Post your track</h2>
						<div className="form-group">
							<label htmlFor="title"> Track Title </label>
							<input type="title" className="form-control" name="title" id="title" placeholder="title" />
						</div>
						<div className="form-group">
							<label htmlFor="URL"> Track Link </label>
							<input type="text" name="URL" className="form-control" id="URL" placeholder="track link" />
						</div>
						<div className="form-group">
							<label htmlFor="description"> Description </label>
							<input type="description" name="description" className="form-control" id="description" placeholder="description (optional)" />
						</div>
						<button className="btn btn-default" type="submit"> Submit </button>
					</form>
					<button className="btn btn-default" onClick={this._toggleSubmit} > Cancel </button>
				</div>
				
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

	_vote4: function() {
		var currentTrack = this.props.model.attributes


		if(!User.getCurrentUser()) {
			alert('please login to vote')
		}
		else if (User.getCurrentUser()) {

			var userLikes = JSON.parse(User.getCurrentUser().get('tracksLiked'))
				if (currentTrack._id === userLikes[currentTrack.challengeId]){
					ACTIONS.saveVote(currentTrack.challengeId," ")
				}

				else {
				ACTIONS.saveVote(currentTrack.challengeId,currentTrack._id)
				}	

		}

	},



	//renders either a filled in or outlined heart
	_voteCheck: function() {
		if (User.getCurrentUser()) {
			var currentTrack = this.props.model.attributes
			var u = User.getCurrentUser()
			var votes = JSON.parse(u.get('tracksLiked'))
			if(currentTrack._id === votes[currentTrack.challengeId]){
				return true
			}
			else {
				return false
			}
		}
		else {
			return false
		}
	},




	//<i class="fa fa-star" aria-hidden="true"></i>    <i className="fa fa-star-o" aria-hidden="true"></i>
	render: function() {
		var currentTrack = this.props.model.attributes
		console.log(currentTrack)


		return ( 
			<Cassette model={this.props.model} />
			)

		/*return (
			<div className='track well'> 
				<h2> {currentTrack.title} </h2> <p> by {currentTrack.userName} </p>
				<a href={currentTrack.link}> check it out! </a>
					{this._voteCheck() ? (
						<i className="fa fa-star fa-2x" aria-hidden="true" onClick={this._vote4}></i>
						) : (
						<i className="fa fa-star-o fa-2x" aria-hidden="true" onClick={this._vote4}></i>
						)}
			</div>
			)*/
	}
})




export default ChallengeView