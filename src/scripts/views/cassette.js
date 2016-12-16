
import React from 'react'
import ACTIONS from '../ACTIONS'
import STORE from '../STORE'




const Images = { 
	blk: '../images/cassetteblk.png',
	orng: '../images/cassetteorange.png',
	grn: '../images/cassettegrn.png',
	blu: '../images/cassetteblue.png',
	wheel: '../images/spinningwheel.gif',



}


const Cassette = React.createClass({ 


		getInitialState: function() {
			return {widget: null,
					songPlaying: false}
		},

		componentDidMount: function() {
		console.log("aaaaah")
		//widget.bind(SC.Widget.Events.READY)
		this.setState({
			widget: "hahahaha"
		})

	},


	_togglePlay: function(){
		console.log(this.props.model.attributes)

		if(this.state.widget) {
			var id = "#" + this.props.model.attributes._id
			console.log(id)
			var iframeElement  = document.querySelector("#hey");
			var widget = SC.Widget(iframeElement)
			widget.bind(SC.Widget.Events.READY)
			widget.toggle()
			this.setState({
				songPlaying: !this.state.songPlaying
			})
		}
		else{
			console.log("hold up")
		}
	},

	_cassetteColor: function() {
		console.log(this.props.model.attributes.tapeColor)
		return (Images[this.props.model.attributes.tapeColor])

	},



	_songSrc: function() {
			console.log(this.props.model.attributes.link.slice(1))
			return (this.props.model.attributes.link.slice(1) + "&show_artwork=false&liking=false&sharing=false&auto_play=false")
		},




	_vote4: function() {
		var currentTrack = this.props.model.attributes


		if(!User.getCurrentUser()) {
			alert('please login to vote')
		}
		else if (User.getCurrentUser()) {

			var userLikes = JSON.parse(User.getCurrentUser().get('tracksLiked'))
				if (currentTrack._id === userLikes[currentTrack.challengeId]){
					ACTIONS.saveVote(currentTrack.challengeId," ")
				}

				else {
				ACTIONS.saveVote(currentTrack.challengeId,currentTrack._id)
				}	

		}

	},



	//renders either a filled in or outlined heart
	_voteCheck: function() {
		if (User.getCurrentUser()) {
			var currentTrack = this.props.model.attributes
			var u = User.getCurrentUser()
			var votes = JSON.parse(u.get('tracksLiked'))
			if(currentTrack._id === votes[currentTrack.challengeId]){
				return true
			}
			else {
				return false
			}
		}
		else {
			return false
		}
	},
	

	render: function() {

		console.log(this.props.model.attributes)
		var track = this.props.model.attributes
		var trackId = track._id 

		return (
			<div className='track' >
				<img src={this._cassetteColor()} className="img-responsive" />
				{this.state.songPlaying ? ( 
				<div className="wheel-container">
					<img src={Images.wheel} className='playing-gif-left img-responsive' />
					<img src={Images.wheel} className='playing-gif-right img-responsive' />
				</div>  ): (<div></div>)}
				
				<div className='cassetteHeader'>
					<h2 className='cassetteTitle'> {track.title}</h2>
					<h3 className='composer'> {track.user} </h3> 
				</div> 

				<div className="track-controll">
					<a href={this.props.model.attributes.link +"'"}><i className="fa fa-soundcloud" aria-hidden="true"></i> </a>

					{this.state.songPlaying ? (
					<i className="fa fa-pause-circle-o" aria-hidden="true" onClick={this._togglePlay}></i>) :
					(<i className="fa fa-play-circle-o" onClick={this._togglePlay}></i>)}

					{this._voteCheck() ? (
						<i className="fa fa-star fa-2x" aria-hidden="true" onClick={this._vote4}></i>
						) : (
						<i className="fa fa-star-o fa-2x" aria-hidden="true" onClick={this._vote4}></i>
						)}
				</div>
      			<iframe display="none" id="hey"
      					src={this._songSrc()}
      					>
      			</iframe>
			</div>
			)
      			}


})





export default Cassette
