const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get All Items
//@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//@route POST api/items
//@desc Create An Item
//@access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc Create a Item
//@access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ succes: true })))
        .catch(err => res.status(404).json({ succes: false }));
});

//@route POST api/items
//@desc Toggle "done"
//@access Public
router.post('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            // console.log(item.done);
            Item.updateOne({ "_id": req.params.id }, { $set: { "done": !item.done } })
                // .then(data=>console.log(data))
                .catch(err => console.log(err))
        }).catch(err => console.log(err))
});

module.exports = router;