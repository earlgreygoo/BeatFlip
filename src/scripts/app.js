import init from './init'
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import HomeView from './views/homeView'
import LoginView from './views/loginView'
import ChallengeView from './views/challengeView'
import UserView from './views/userView'
import AdminView from './views/adminView'
import SplashPage from './views/splashPage'


const app = function() {

	console.log('hi')

	const Router = Backbone.Router.extend({
		routes: {
			"home": "handleHome",
			"login": "handleLogin",
			"challenges/:id": "handleChallenge",
			"user/:_id": "handleUser",
			"admin": "handleAdmin",
			"*default": "handleDefault"
		},

		handleHome: function() {
			ReactDOM.render(<HomeView/>, document.querySelector(".container"))
		},
		handleLogin: function() {
			ReactDOM.render(<LoginView />, document.querySelector(".container"))
		},
		handleChallenge: function(id) {
			ReactDOM.render(<ChallengeView id={id} />, document.querySelector(".container"))
		},
		handleUser: function() {
			ReactDOM.render(<UserView/>, document.querySelector(".container"))
		},
		handleDefault: function(){
			ReactDOM.render(<SplashPage />, document.querySelector(".container"))
		},
		handleAdmin: function() {
			ReactDOM.render(<AdminView/>, document.querySelector(".container"))
		},
		initialize: function() {
			Backbone.history.start()
		}

	})

	new Router()

	
}

export const app_name = init()
app()