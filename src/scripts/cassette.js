
import React from 'react'
import ACTIONS from '../ACTIONS'
import STORE from '../STORE'


const Cassette = React.createClass({ 


	render: function() {

		var widget = SC.Widget(this.props.attributes.trackId)

		widget.bind(SC.Widget.Events.READY)

		return (
			<div className='track'>	
				<iframe display="none" id={this.props.attributes.trackId}
      					src="http://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/252231083&show_artwork=false&liking=false&sharing=false&auto_play=false"
      					width="420"
      					height="120"
      					frameborder="no">
      			</iframe>

      			<button onClick={widget.toggle}> play/pause </button> 
					
			</div>
			)
      			}


})



export default Cassette
