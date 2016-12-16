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

	_headerUserStyle: function() {
		if(User.getCurrentUser()) {
			return {display: 'inline-block' }
		}
		else {
			return {display: 'none'}
		}
	},


	_getUserName: function() {
		if(User.getCurrentUser()) {
			return User.getCurrentUser().attributes.username
		}
		else {
			return
		}
	},

	render: function() {


		return (
			<nav className='navbar navbar-default navbar-static-top'>
				<div className="container-fluid">
				<h1 className='navbar-header'> Beat/Flip </h1>
				<div className='btn-group'>
					<button onClick={()=>location.hash = 'home'} className="btn btn-default" style={this._challengeStyle()}>Challenges</button> 
					<button onClick={()=> this.toUserPage(User.getCurrentUser().attributes._id)}  className="btn btn-default" style={this._profileStyle()}>My profile</button>
					<button onClick={ACTIONS.logout} className="btn btn-default" style={this._logoutStyle()}> Log Out </button>
					<button onClick={()=>location.hash = 'login'} style={this._registerStyle()} className="btn btn-default" > Register/Login </button>
				</div>
				<div className='headerUser' style={this._headerUserStyle()}>
					<h5> logged in as </h5>
					<h3> {this._getUserName()} </h3>
				</div>
				</div>
			</nav>
			)
	}
})


export default Header