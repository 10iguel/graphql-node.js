const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
        title: {
            required: true,
            type: String
        },
        imageUrl: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
        },
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Post', PostSchema)
