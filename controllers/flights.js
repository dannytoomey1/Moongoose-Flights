const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newFlight,
    create,
    index,
    show
}

function newFlight(req, res) {
    const newFlight = new Flight(req.body);
    const dt = newFlight.departs;    
    res.render('flights/new', dt);
}

function create(req, res) {
    for (let prop in req.body) {
        if (req.body[prop] === '') delete req.body[prop];
    }
    Flight.create(req.body);
    res.redirect('/flights');
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            flights
        })
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        const selectedAirports = []
        for (let i =0; i < flight.destinations.length; i++) 
            selectedAirports.push(flight.destinations[i].airport)
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', {title: 'Flight Details', flight, selectedAirports, tickets})
        })
    })
}