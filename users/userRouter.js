const express = require('express');
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(insertedUser =>{
    res.status(201).json(req.body)
  })
  .catch(err => {
    res.status(500).json({message: "There was an error adding a user to the server."})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    !user ? res.status(404).json({message: "No such user exists."}) : 
    (
      Posts.insert({...req.body, user_id: req.params.id})
      .then(insertedPost =>{
        res.status(201).json({...req.body, user_id: req.params.id})
      })
      .catch(err => {
        res.status(500).json({message: "There was an error adding a post to the server."})
      })
    )
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting the user from the server."})
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

router.get('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    !user ? res.status(404).json({message: "No such user exists."}) : res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting the user from the server."})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    !user ? res.status(404).json({message: "No such user exists."}) :
    (
      Posts.getById(req.params.id)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => {
        res.status(500).json({message: "There was an error getting posts of that user from the server."})
      })
    )
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting the user from the server."})
  })

  
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    !user ? res.status(404).json({message: "No such user exists."}) :
    (
      Users.remove(req.params.id)
      .then(removedCount => {
        res.status(200).json({message: `Successfully removed ${removedCount} user.`})
      })
      .catch(err => {
        res.status(500).json({message: "There was an error removing that user from the server."})
      })
    )
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting the user from the server."})
  })

  
});

router.put('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    !user ? res.status(404).json({message: "No such user exists."}) :
    (
      Users.update(req.params.id)
      .then(updatedCount => {
        res.status(200).json({message: `Successfully updated ${updatedCount} user.`})
      })
      .catch(err => {
        res.status(500).json({message: "There was an error updating that user to the server."})
      })
    )
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting the user from the server."})
  })

  
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
