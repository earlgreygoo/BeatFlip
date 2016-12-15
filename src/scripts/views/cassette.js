
import React from 'react'
import ACTIONS from '../ACTIONS'
import STORE from '../STORE'


const Cassette = React.createClass({ 


		getInitialState: function() {
			return {widget: null}
		},

		componentDidMount: function() {
		console.log("aaaaah")
		//widget.bind(SC.Widget.Events.READY)
		this.setState({
			widget: "hahahaha"
		})

	},


	_togglePlay: function(){

		if(this.state.widget) {
			var iframeElement   = document.querySelector('#hey');
			var widget = SC.Widget(iframeElement)
			widget.bind(SC.Widget.Events.READY)
			widget.toggle()
		}
		else{
			console.log("hold up")
		}
	},
	

	render: function() {
		console.log(this.props)


		return (
			<div className='track'>	
				<button onClick={this._togglePlay}> AAAAAAAAH </button>
      			<iframe display="none" id="hey"
      					src="http://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/252231083&show_artwork=false&liking=false&sharing=false&auto_play=false"
      					>
      			</iframe>
			</div>
			)
      			}


})





export default Cassette
