const router = require('express').Router();
let Image = require('../models/image.model');



router.post('/saveUrl', (req, res) => {
    Image.find({ id: req.body.id, imageUrl: req.body.imageUrl })
        .then((images) => {
            if (images.length > 0) {
                return res.json({ message: "Photo has been added" })
            }
            else {
                let img = new Image({
                    id: req.body.id,
                    imageUrl: req.body.imageUrl
                })
                img.save()
                    .then(() => res.json({ message: "Photo has added" }))
                    .catch((err) => res.json({ message: "Fiald to add Photo URL" + err }))
            }
        })
        .catch(() => res.json({ message: "error with '/saveUrl'" }))
});
router.post('/images', (req, res) => {
    Image.find({ id: req.body.id })
        .then((userImages) => {
            res.json({ info: userImages })
        })
        .catch((err) => {
            err.json({ message: "faild to get Images" })
        })
})
router.post('/', (req, res) => {
    id = req.body.id;
    Image.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            res.json({ message: `Image doesn't delete,the error is :${err}` })
        }
        else {
            res.json({ message: "image Deleted" });
        }
    });
})
module.exports = router;

