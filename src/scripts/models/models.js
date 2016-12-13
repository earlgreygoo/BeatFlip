import Backbone from 'backbone'

export const ChallengeModel = Backbone.Model.extend({
	url: function() {
		return `/api/challenges/${this.id}`
	},
	urlRoot: '/api/challenges',
	idAttribute: '_id',
})

export const ChallengeCollection = Backbone.Collection.extend({
	url: '/api/challenges',
	model: ChallengeModel
})

export const TrackModel = Backbone.Model.extend({
	urlRoot: '/api/tracks'
})

export const TrackCollection = Backbone.Collection.extend({
	url: '/api/tracks',
	model: TrackModel
})
