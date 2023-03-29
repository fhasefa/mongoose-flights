const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    flightNo: { 
        type: Number, required: true,
        min: 10,
        max: 9999
    },
    departs: { 
        type: Date,
        default: function() {
            const currentDate = new Date();
            const oneYearFromNow = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
            return oneYearFromNow;
        }
    },
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'],
        default: 'SAN'
    },
    destinations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Destination'
    }]
 }, { timestamps: true })


 const Flight = mongoose.model('Flights', flightSchema)
 
 module.exports = Flight