import Backbone from 'backbone'
import _ from 'underscore'
import {ChallengeCollection, ChallengeModel, TrackCollection} from './models/models'

const STORE = _.extend(Backbone.Events, {

	_data: {
		challengeCollection: new ChallengeCollection(),
		trackCollection: new TrackCollection(),
		currentChallenge: new ChallengeModel(),
		currentTracks: new TrackCollection(),
		selectedTrack: "",
		submissionWindowVisible: false,
	},

	_emitChange: function() {
		this.trigger('storeChanged')
	},

	_getData: function() {
		return this._data
	},

	_get: function(prop) {
		return this._data[prop]
	},

	_set: function(changeObj) {
		this._data = _.extend(this._data,changeObj)
		this._emitChange()
	}
})

export default STORE