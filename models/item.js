const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);