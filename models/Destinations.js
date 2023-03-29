const mongoose = require('mongoose')

const Schema = mongoose.Schema

const destinationSchema = new Schema({
   airport: { 
        type: String, 
        enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'] 
    },
   arrival: { type: Date }
}, { timestamps: true })

const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination