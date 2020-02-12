const express = require('express');
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(insertedUser =>{
    res.status(201).json(req.body)
  })
  .catch(err => {
    res.status(500).json({message: "There was an error adding a user to the server."})
  })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Posts.insert({...req.body, user_id: req.params.id})
  .then(insertedPost =>{
    res.status(201).json({...req.body, user_id: req.params.id})
  })
  .catch(err => {
    res.status(500).json({message: "There was an error adding a post to the server."})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting users from the server."})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting posts of that user from the server."})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(removedCount => {
    res.status(200).json({message: `Successfully removed ${removedCount} user.`})
  })
  .catch(err => {
    res.status(500).json({message: "There was an error removing that user from the server."})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(updatedCount => {
    res.status(200).json({message: `Successfully updated ${updatedCount} user.`})
  })
  .catch(err => {
    res.status(500).json({message: "There was an error updating that user to the server."})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    !user ? res.status(404).json({message: "invalid user id"}) : 
    (
      req.user=user, 
      next()
    )
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting the user from the server."})
  })
  
}

function validateUser(req, res, next) {
  // do your magic!
  !req.body ? res.status(400).json({message:"missing user data"}) :
  !req.body.name ? res.status(400).json({message:"missing user name"}) : next()
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
