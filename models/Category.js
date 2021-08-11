const mongoose = require ('mongoose')

const categorySchema = mongoose.Schema ({
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Category', categorySchema)