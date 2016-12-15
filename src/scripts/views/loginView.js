import React from 'react'
import ACTIONS from '../ACTIONS'
import User from '../models/userModel'
import Header from './header'

var LoginView = React.createClass({
	render: function() {
		return (
			<div className="login-view">
				<Header />
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
			<div className="well well-lg">
				<h1> Register </h1>
				<form onSubmit={this._handleSubmit}>
					<div className="form-group" >
						<label htmlFor="email">Email address:</label>
						<input type="email" className="form-control" id="email" />
					</div>
					<div className="form-group" > 
						<label htmlFor="pwd">Password:</label>
    					<input type="password" name="password" className="form-control" id="pwd" />
					</div>
					<div className="form-group">
						<label htmlFor="username">User Name:</label>
						<input type="username" className="form-control"	id="username" />
					</div>
 					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
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
			<div className="well well-sm">
				<h1> Login </h1>
				<form className="form-inline" onSubmit={this._handleSubmit}>
					<div className="form-group">
						<label htmlFor="email"> Email address: </label>
						<input type="email" 	name="email" 	className="form-control"	placeholder="enter your email" id="email" />
					</div>
					<div className="form-group">
						<label htmlFor="pwd"> Password: </label>
						<input type="password" 	className="form-control" id="pwd" name="password" placeholder="enter your password" />
					</div>
					<button type="submit" className="btn btn-default">Log In</button>
				</form>
			</div>
		)
	}
})
export default LoginView

/* <form class="form-inline">
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" id="email">
  </div>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd">
  </div>
  <div class="checkbox">
    <label><input type="checkbox"> Remember me</label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form> */
