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

		setTimeout(()=>location.hash ="#home",1000)
	},

	render: function() {

		return (

			<div className='splash'>
				<img src='../images/beat-lab.jpg' />
				<h2 className="beat"  id={this.state.beatId}> Beat </h2>
				<h2 className="slash"  > / </h2>
				<h2 className="flip" id={this.state.flipId} > Flip </h2>
				<button onClick={this._takeMeHome}> ENTER </button> 
			</div>

			)


	}



})

export default SplashPage