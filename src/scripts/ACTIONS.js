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

	submitTrack: function(trackObject){
		var t = new TrackModel()
		t.save(trackObject)
		 .then(
		 	function(resp) {
		 		alert('track posted!')
		 		console.log(resp)
		 	},
		 	function(err){
		 		alert('could not post track')
		 		console.log(err)
		 	})
	}

	
}

export default ACTIONS