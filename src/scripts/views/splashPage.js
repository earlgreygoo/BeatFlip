import React from 'react'
import ACTIONS from '../ACTIONS'
import Header from './header'
import STORE from '../STORE'
import User from '../models/userModel'




const SplashPage = React.createClass({

	getInitialState: function() {
		return ({
			beatId: "wow",
			flipId: "wow"
			})
		
	},


	_takeMeHome: function() {
		this.setState({
			beatId: 'pulse',
			flipId: 'flip'
		})

		setTimeout(()=>location.hash ="#home",2000)
	},

	render: function() {

		return (

			<div className='splash'>
				<img src='../images/beat-lab.jpg' />
				<div className="logo" >
					<h2 className="beat"  id={this.state.beatId}> beat </h2>
					<h2 className="slash"  > / </h2>
					<h2 className="flip" id={this.state.flipId} > flip </h2>
				</div>
				<button onClick={this._takeMeHome}> enter </button> 
			</div>

			)


	}



})

export default SplashPage