const mongoose = require('mongoose');

const tagalogjokes_schema = new mongoose.Schema({
    question: {
        type: String,
        required: [ true, "Question is required!"]
    },
    answer: {
        type: String,
        required: [ true, "Answer is required!"]
    }, 
    type: {
        type: String,
        required: [ true, "Type is required!"]
    },
    id: {
        type: Number,
        required: [ true, "Id is required!"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    addedOn: {
        type: Date,
        default: new Date()
    }    
})

module.exports = mongoose.model('TagalogJokes', tagalogjokes_schema)