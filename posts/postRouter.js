const express = require('express');
const posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
    posts.get()
    .then(results => res.json(results))
    .catch(err => res.json(err))
});

router.get('/:id',validatePostId, (req, res) => {
    const id = req.params.id;
    posts.getById(id)
    .then(results => res.json(results))
    .catch(err => console.log(err))
});

router.delete('/:id',validatePostId, (req, res) => {
    posts.remove(req.params.id)
    .then(results => {
        res.json(results);
    })
});

router.put('/:id',validatePostId, (req, res) => {
    posts.update(req.params.id, req.body.text)
    .then(res.status(200).json({message: `${req.body.text}`}))
});

// custom middleware

function validatePostId(req, res, next) {
    const postID = req.params.id;
    
    if(!postID){
    return res.status(400).json({message: "no"})}else{
       req.post = postID
    }
    next();
}

module.exports = router;