import React from 'react'
import ACTIONS from '../ACTIONS'
import User from '../models/userModel'

var LoginView = React.createClass({
	render: function() {
		return (
			<div className="login-view">
				<div className="log-reg-box">
					<Login />
					<Register /> 
				</div>
			</div>
			)
	}
})
var Register = React.createClass({
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var userInput = {
			email: eventObj.target.email.value,
			password: eventObj.target.password.value,
			username: eventObj.target.username.value
		}

		ACTIONS.register(userInput)
	},
	render: function() {
		return (
			<form onSubmit={this._handleSubmit}>
				<h2>Register Here</h2>
				<input type="email" 	name="email" 		placeholder="email" />
				<input type="password" 	name="password" 	placeholder="password" />
				<input type="username"  name="username"		placeholder="username" />
 				<button type="submit">Submit</button>
			</form>
		)
	}
})

var Login = React.createClass({
	_handleSubmit: function(eventObj){
		console.log(eventObj)
		eventObj.preventDefault()
		var loginInput = {
			email: eventObj.target.email.value,
			password: eventObj.target.password.value
		}
		ACTIONS.login(loginInput)
	},

	render: function() {
		return (
			<form onSubmit={this._handleSubmit}>
				<input type="email" 	name="email" 		placeholder="Please enter your email" />
				<input type="password" 	name="password" 	placeholder="Choose a password" />
				<button type="submit">Log In</button>
			</form>
		)
	}
})
export default LoginView