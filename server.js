//require dotENV
require('dotenv').config();

//Load express
const express = require('express');

const connectDB = require('./config/database')

//create our expess app
const app = express()

const PORT = 8080;

//connect to our database
connectDB();

//Load our Routes

// npm install jsx-view-engine react react-dom
const {createEngine} = require('jsx-view-engine');

// Load the method-override middleware
const methodOverride = require('method-override')

// Configure the view engine and look for files ending in jsx
app.set('view engine', 'jsx')

// Create the engine and accept files ending in jsx
app.engine('jsx', createEngine())

// a middleware that formats the form data (currently a string that looks like query params) into a object we can use
app.use(express.urlencoded({ extended: true }))

// hack into our form and give it more HTTP methods (like DELETE and PUT)
app.use(methodOverride('_method'))


// look for static files (like css) in the public folder
app.use(express.static('public'))

const Flight = require('./models/Flights')
const Destination = require('./models/Destinations')

// create a custom middleware for logging the HTTP Method and path 
app.use((req, res, next) => {
    console.log('inside middleware')
    console.log(`${req.method} ${req.path}`)
    next()
})

//Routes
app.get('/flights', async (req, res) => {
    try {
        const result = await Flight.find()
        console.log(result)
        const newFlight = new Flight();
        // Obtain the default date
        const dt = newFlight.departs;
        // Format the date for the value attribute of the input
        const departsDate = dt.toISOString().slice(0, 16);
        res.render('Index', { result, departsDate })
    } catch(err) {
        console.log(err)
    }
})

app.get('/flights/new', (req,res) => {
	const newFlight = new Flight();
	// Obtain the default date
	const dt = newFlight.departs;
	// Format the date for the value attribute of the input
	const departsDate = dt.toISOString().slice(0, 16);
	res.render('New', {departsDate});
    res.redirect('/flights')
})

app.get ('/flights/:id', async (req, res) => {
    try {
        const result = await Flight.findById(req.params.id).populate({path: 'destinations', options: {sort: {arrival: 1}}})
        const newFlight = new Flight();
        // Obtain the default date
        const dt = newFlight.departs;
        // Format the date for the value attribute of the input
        const departsDate = dt.toISOString().slice(0, 16);
        res.render('Show', { result, departsDate })
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
})

app.post('/flights', async (req,res) => {
    try {
        // use the model to interact with db and create a new document in the fruit collection
        const result = await Flight.create(req.body)
        const newFlight = new Flight();
        // Obtain the default date
        const dt = newFlight.departs;
        // Format the date for the value attribute of the input
        const departsDate = dt.toISOString().slice(0, 16);
        console.log(result)
        res.render('Show', {bresult, departsDate })
    } catch(err) {
        console.log(err)
    }

    res.redirect('/flights')

})

app.get('/flights/:id/destinations', async (req, res) => {
    // target the destination property 
    res.send('')
})

app.post('/flights/:id/destinations', async (req, res) => {
    // create a document in our destination collection
    const destination = await Destination.create(req.body)
    // find the flight
    await Flight.findByIdAndUpdate(req.params.id, {
        // and push the new destination document's id
        $push: {
            // to the destination's flight field/property
            destinations: destination._id
        }
    })
    res.redirect(`/flights/${req.params.id}`)
})

// router.get('/:id/destinations/:did', flightControl.showDestination)

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})