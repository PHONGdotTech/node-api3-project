const express = require('express');
const Users = require("../users/userDb.js");
const Posts = require("./postDb.js");

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err=>{
    res.status(500).json({message: "There was an error getting posts from the server"})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(removedCount => {
    res.status(200).json({message: `Successfully removed ${removedCount} post with ID ${req.params.id}`})
  })
  .catch(err=>{
    res.status(500).json({message: "There was a problem removing the post from the server"})
  })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(updatedCount =>{
    res.status(200).json({
      message: `Successfully updated ${updatedCount} post.`,
      oldPost: req.post,
      updatedPost: {id: parseInt(req.params.id), ...req.body, user_id: req.post.user_id}
  })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post =>{
    !post ? res.status(404).json({message: "No post with that ID exists"}) :
    req.post = post,
    next()
  })
  .catch(err=>{
    res.status(500).json({message: "There was an error getting the post with that ID from the server"})
  })
}

function validatePost(req, res, next) {
  Object.keys(req.body).length === 0 && req.body.constructor === Object ? res.status(400).json({message:"missing post data"}) :
  !req.body.text ? res.status(400).json({message:"missing required text field"}) : next()
}

module.exports = router;
