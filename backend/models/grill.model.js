const mongoose = require('mongoose')

const Schema = mongoose.Schema

const grillSchema = new Schema({
    Titlu: { type: String, required: true },
    Descriere: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Rating:{ type: Number, required: false, default: 0 },
    Image: { type: String, required: true },
},  {
    timestamps: true,
})

const Grill = mongoose.model('Grill',grillSchema)

module.exports = Grill