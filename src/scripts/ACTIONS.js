import STORE from './store'
import {ChallengeModel, ChallengeCollection, TrackCollection, TrackModel} from "./models/models"
import User from './models/userModel'

window.User = User

const ACTIONS = {


	fetchChallenges: function() {
		var c = new ChallengeCollection()
		c.fetch().then(function(){
			STORE._set({
				challengeCollection: c
			})
		})
	},

	fetchCurrentChallenge: function(theId){
		var c = new ChallengeModel()
		c.id = theId
		c.fetch().then(function(){
			STORE._set({
				currentChallenge: c
			})
		})
	},

	fetchTracks: function(filterId){
		var t = new TrackCollection()
		t.fetch().then(function(){
			var filteredTracks = t.models.filter((t)=> t.attributes.challengeId === filterId)
			STORE._set({
				currentTracks: filteredTracks
			})
		})
	},

	deleteTrack: function(trackId) {
		
		var trackCollection = new TrackCollection()
		trackCollection.fetch({
			data: {
				_id: trackId
			}
		}).then(()=> { 
			trackCollection.models[0].destroy()
		})		
	},

	login: function(userDataObj) {
		User.login(userDataObj.email,userDataObj.password)
			.then(
				function(resp) {
					alert('user successfully logged in!')
					console.log(resp)
					location.hash = "home"
				},
				function(err) {
					alert('could not login')
					console.log(err)
				})
	},

	logout: function() {
		var userName = User.getCurrentUser().username
		User.logout()
			.then(
				function() {
					alert( userName + ' logged out!' )
					location.hash = "login"
				})
	},

	register: function(userDataObj) {
		User.register(userDataObj)
			.then(
				function(resp) {
					alert('user successfully created!')
					console.log(resp)
					ACTIONS.login(userDataObj)
				},
				function(err) {
					alert('problem creating user')
					console.log(err)
				})
	},

	submitTrack: function(trackObject, challId){
		var t = new TrackModel()
		t.save(trackObject)
		 .then(
		 	function(resp) {
		 		alert('track posted!')
		 		console.log(resp)
		 		ACTIONS.saveSubmission(challId,resp._id)
		 	},
		 	function(err){
		 		alert('could not post track')
		 		console.log(err)
		 	})
	},

	saveSubmission: function(challengeId, trackId) {
		var u = User.getCurrentUser()
	 	var submissions = u.get('submissions') ? JSON.parse(u.get('submissions')) : {}
	 	submissions[challengeId] = trackId
	 	u.set({
			submissions: JSON.stringify(submissions)
		 })
	 	console.log(u)
	 	u.save().then(()=> location.reload())
	},

	saveVote: function(challengeId,trackId){
		var u = User.getCurrentUser()
	 	var likes = u.get('tracksLiked') ? JSON.parse(u.get('tracksLiked')) : {}
	 	likes[challengeId] = trackId
	 	u.set({
			tracksLiked: JSON.stringify(likes)
		 })
	 	console.log(u)
	}


	
}

// ADD to tracksLiked so that you can vote on multiple challenges
// very similar for adding a submission.

// var u = User.getCurrentUser()

// u.saveSubmission(challengeId,trackId)

// var tracksLiked = JSON.parse(u.get('tracksLiked'))

// tracksLiked[challengeId] = tracksLiked

// u.set({
// 	tracksLiked: JSON.stringify(tracksLiked)
// })

// u.save().then((resp)=>console.log(resp))




export default ACTIONS