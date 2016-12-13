const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  email:       { type: String, required: true },
  password:    { type: String, required: true },
  username:    { type: String, required: true},
  avatar:      { type: String, required: false, default: "../src/ASSETS/rec.png"},
  createdAt:   { type: Date, default: Date.now },
  score:       { type: Number, default: 0},
  submissions: {type: Array, default: [{}]},
  tracksLiked: {type: Array, default: [{}]},
  admin:       {type: Boolean, default: false}
})

// ---------------------
//	CHALLENGES
// ---------------------

const challengeSchema = new mongoose.Schema({
	title:     {type:String, required:true},
	imgUrl:    {type:String, required:false},
	userId:    {type: String, required: true},
	createdAt: {type:Date, default:Date.now},
  details:   {type:String, required:false},
  deadline:  {type:Date, required: false},
  prize:     {type:String, required: false},
  isActive:  {type: Boolean, default: true}
})


// --------------------
// SUBMISSIONS
// --------------------
const trackSchema = new mongoose.Schema({
  title:       {type:String, required: true},
  link:        {type: String, required: true},
  description: {type: String, required: false},
  challengeId: {type: String, required: true},
  votes:       {type: Number, default: 0}

})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Challenge: mongoose.model('Challenge', challengeSchema),
  Track: mongoose.model('Track', trackSchema)
}
