import React from 'react'
import ACTIONS from '../ACTIONS'
import Header from './header'
import STORE from '../STORE'
import User from '../models/userModel'


if(User.getCurrentUser()) {
	console.log("whaddup")
}
const AdminView = React.createClass({


	componentWillMount: function() {
		ACTIONS.fetchChallenges()
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
		console.log(this.state)
		return (
			<div className="adminPage">
			</div>
			)
	}
})



export default AdminView




