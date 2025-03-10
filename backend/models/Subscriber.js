const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    email:{
        type: 'string',
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    subscribeAt:{
        type:Date,
        defaultValue: Date.now(),
    }
})

module.exports = mongoose.model('Subscriber',subscriberSchema)