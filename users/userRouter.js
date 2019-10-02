const express = 'express';

const router = express.Router();

router.post('/',validateUser, (req, res) => {

});

router.post ('/:id/posts', validateUserId, validatePost, (req, res) => {

});

router.get('/', (req, res) => {
    users.get()
    .then(results => res.json(results))
    .catch(err => res.json(err))
});

router.get('/:id',validateUserId, (req, res) => {
    const id = req.params.id;
    users.getByID(id)
    .then(results => res.json(results))
    .catch(err => console.log("certainly not", err))
});

router.get('/:id/posts',validateUserId,validatePost, (req, res) => {
    users.getUserPosts(req.params.id)
    .then(results => {
        res.json(results)
        
    })
    .catch(err => res.send(err))
});

router.delete('/:id',validateUserId, (req, res) => {
    users.remove(req.params.id)
    .then(results => {
        res.json(results);
    })
});

router.put('/:id',validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const userID = req.params.id;
    if(!userID || userID !== req.params.user_id){
    return res.status(400).json({message: "no"})}else{
        req.user(userID)
    }
    next();
}

function validateUser(req, res, next) {
    const user = req.params.body;
    if(!user){
        res.status(400).json({message: "by no means"})
    }if(!user.name){
        res.status(400).json({message: "of course not"})
    }else{
        next();
    }
};

function validatePost(req, res, next) {
    const post = req.params.body;
    if(!post){
        res.status(400).json({message: "not really"})
    }if(!post.text){
        res.status(400).json({message: "on no account"})
    }else{
        next();
    }
};

module.exports = router;
