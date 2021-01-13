const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require("bcrypt");


router.post("/signup", (req, res) => {
    User.find({ username: req.body.username })
        .then((user) => {
            if (user.length) {
                return res.json({
                    message: "username exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        });
                        user.save()
                            .then(result => {
                                res.json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                res.json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});
router.post('/login', (req, res) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const currUser = { user: user[0], message: "auth succesfull" }
                    res.json(currUser);
                }else{
                    res.json({message:"wrong username/password"}); 
                }
            });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
});
router.post('/update', (req, res) => {
    User.findById({ _id: req.body._id })
        .then(user => {
            bcrypt.compare(req.body.oldpass, user.password, (err, result) => {
                if (err) {
                    return res.json({
                        message: "failed to compare old-new Paswords"
                    });
                }
                if (result===false) {//old password invalid
                    res.json({message: "Invalid Old Password"});
                }
                else{//Auth old pass ,update user
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.json({ message: "Faild to encrypt the New Password" });
                        } else {
                            user.username = req.body.username || user.username;
                            user.password = hash;
                            user.firstname = req.body.firstname || user.firstname;
                            user.lastname = req.body.lastname || user.lastname;
                            user.email = req.aborted.email || user.email;
                            user.save()
                                .then(() => res.json({ message: "User updated" }))
                                .catch(error => res.json({ message: `User doesn't update ,error:${error}` }));
                        }
                    })
                }
            });
        })
})
router.delete('/', (req, res) => {
    id = req.body.id;
    User.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            res.json({ message: `User doesn't delete,the error is :${err}` })
        }
        else {
            res.json({ message: "User Deleted" });
        }
    });
})
router.post('/checkId', (req, res) => {
    User.findById(req.body.id, function (err, docs) {
        if (err) {
            res.json({ message: `invalid ID,the error is :${err}` })
        }
        else {
            if (docs) {
                res.json({ message: "Auth Id" });
            }
        }
    });
});
router.post('/getusername', (req, res) => {
    User.findById(req.body.id || "123456789", function (err, docs) {
        if (err) {
            res.json({ message: `faild to get user name,the error is :${err}` })
        }
        else if (docs.firstname !== null) {
            res.json({ name: docs.firstname, message: "Auth Id" });
        }
    });
});
router.get('/getuserinfo', (req, res) => {
    User.findById(req.query.id || "123456789", function (err, docs) {
        if (err) {
            res.json({ message: `faild to get user ,the error is :${err}` })
        }
        else
            if (docs._id !== null) {
                res.json({ user: docs });
            }
    });
});
module.exports = router;