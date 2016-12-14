import React from 'react'
import ACTIONS from '../ACTIONS'





var user = User.getCurrentUser()


const Header = React.createClass({




	toUserPage: function(userId) {
		console.log(user)
		if(user === undefined) {
			alert('you are not logged in')
		}
		else if (user) {
			location.hash ='user/' + userId
		}
	},



	_challengeStyle: function() {
		if(location.hash === "#home") {
			return {display: "none"}
		}
		else {
			return {display: "inline-block"}
		}
	},
	_profileStyle: function() {
		console.log(location.hash)
		if(User.getCurrentUser()) {
			if(/^#user\/.*/.test(location.hash)) { 
				return {display: "none"}
			}
			else {
				return {display:"inline-block"}
			}
		}

		else {
			return {display: "none"}
		}

	},

	_logoutStyle: function() {
		if(User.getCurrentUser()) {
			return {display: "inline-block"}
		}
		else {
			return {display: "none"}
		}

	},

	_registerStyle: function() {
		if(User.getCurrentUser() || location.hash === "#login") {
			return {display: "none"}
		}
		else {
			return {display: "inline-block"}
		}

	},

	render: function() {


		return (
			<div className='header'>
				<h1> Beat/Flip </h1>
				<div className='btn-group'>
					<button onClick={()=>location.hash = 'challenges'} className="btn btn-primary" style={this._challengeStyle()}>Challenges</button> 
					<button onClick={()=> this.toUserPage(User.getCurrentUser().attributes._id)}  className="btn btn-primary" style={this._profileStyle()}>My profile</button>
					<button onClick={ACTIONS.logout} className="btn btn-primary" style={this._logoutStyle()}> Log Out </button>
					<button onClick={()=>location.hash = 'login'} style={this._registerStyle()} className="btn btn-primary" > Register/Login </button>
				</div>

			</div>
			)
	}
})


export default Header