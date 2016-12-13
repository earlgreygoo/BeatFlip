import React from 'react'
import ACTIONS from '../ACTIONS'
const Header = React.createClass({

	
	toUserPage: function(userId) {

		if(!User) {
			alert('you are not logged in')
		}
		else if (User) {
			location.hash ='user/' + userId
		}
	},

	render: function() {


		return (
			<div className='header'>
				<h3> Beat/Flip </h3>
				<div className='page-selection'>
					<button onClick={()=>location.hash = 'challenges'}>Challenges</button> 
					<button onClick={()=> this.toUserPage(User.getCurrentUser().attributes._id)}>My profile</button>
					<button onClick={ACTIONS.logout}> Log Out </button>
					<button onClick={()=>location.hash = 'login'}> Register/Login </button>
				</div>

			</div>
			)
	}
})


export default Header