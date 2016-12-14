let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Challenge = require('../db/schema.js').Challenge
let Track = require('../db/schema.js').Track

  // ********************************************************************************************
  // USER ROUTES 
  // ********************************************************************************************
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })

    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(record)
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })



// *************************************************************************************************
// CHALLENGE ROUTES 
// *************************************************************************************************

    // Routes for a Model(resource) should have this structure


apiRouter
    .post('/challenges', function(req,res) {
      var record = new Challenge(req.body)
      record.save(function(err, record){
        if (err) {
          res.status(500).send(err)
        }
        else {
          res.json(record)
        }
      })
    })


 .get('/challenges', function(req,res) {
      Challenge.find(req.query,function(err,records) {
        if (err) {
          res.status(500).send(err)
        }
        else {
          res.json(records)
        }
      })
    })

 apiRouter
    .get('/challenges/:_id', function(req, res){
      Challenge.findById(req.params._id, function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })

    // Delete one
    .delete('/challenges/:_id', function(req,res) {
      Challenge.remove({_id: req.params._id}, function(err) {
        if (err) {
          res.status(500).json(err)
        }
        else {
          res.json({
            status: 'record with id' + req.params._id + 'successfully deleted!'
          })
        }
      })
    })

     .put('/challenges/:_id', function(req, res){

      Challenge.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(record)
          }
      })
    })


// *************************************************************************************************
// Track Routes 
// *************************************************************************************************

apiRouter 
  .post('/tracks', function(req,res) {
      var record = new Track(req.body)
      record.save(function(err, record){
        if(err){
          res.status(500).send(err)
        }
        else {
          res.json(record)
        }
      })
  })

   .put('/tracks/:_id', function(req, res){

      Track.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(record)
          }
      })
    })


   .get('/tracks', function(req,res) {
      Track.find(req.query,function(err,records) {
        if (err) {
          res.status(500).send(err)
        }
        else {
          res.json(records)
        }
      })
    })

    // Delete one
    .delete('/tracks/:_id', function(req,res) {
      Track.remove({_id: req.params._id}, function(err) {
        if (err) {
          res.status(500).json(err)
        }
        else {
          res.json({
            status: 'record with id' + req.params._id + 'successfully deleted!'
          })
        }
      })
    })


module.exports = apiRouter