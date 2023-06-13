const db = require("../models");
const Event = db.event;
const mongoose = require('mongoose');

exports.create = (req, res) => {
    console.log('req.body', req.body);
    console.log('req.body.event', req.body.event);
    // Validate request
    if (req.body.event === undefined) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }
    const event = new Event({
        eventname: req.body.event,
        time: req.body.time,
        date: req.body.date,
        user: req.body.user
    });

    event.save(event).then(data => {
        res.send(data);
    }
    )
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Event.'
            });
        }
        );


};



// Get all events from the database.
exports.findAll = (req, res) => {
    const event = req.query.event;
    var condition = event ? { event: { $regex: new RegExp(event), $options: 'i' } } : {};
    Event.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Some error occurred while retrieving events.' });
        });
};

// Find a single event with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Event.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: 'Not found Event with id ' + id });
        else res.send(data);
    })
        .catch(err => {

            res.status(500).send({ message: 'Error retrieving Event with id=' + id });
        });
};

//update an event by id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!'
        });
    }
    const id = req.params.id;
    console.log('req.body', req.body)
    Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {    
            res.status(404).send({
                message: `Cannot update Event with id=${id}. Maybe Event was not found!`
            });
        } else res.send({ message: 'Event was updated successfully.' });
    })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Event with id=' + id
            });
        });
};

// Delete a event with the specified id in the request
exports.delete = (req, res) => {    
    const id = req.params.id;
    Event.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                });
            } else {
                res.send({
                    message: 'Event was deleted successfully!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Event with id=' + id
            });
        });
}  

// Delete all events from the database.
exports.deleteAll = (req, res) => {
    Event.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Events were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while removing all events.'
            });
        });
}

// Find all events for a user
exports.findAllUserEvents = (req, res) => {
    const id = req.params.id;
    Event.find({ user: id }).then(data => {
        if (!data)
            res.status(404).send({ message: 'Not found Event with id ' + id });
        else res.send(data);
    })
        .catch(err => {

            res.status(500).send({ message: 'Error retrieving Event with id=' + id });
        });
}
