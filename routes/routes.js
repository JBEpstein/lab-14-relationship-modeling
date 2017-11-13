const express = require('express');
const jsonParser = require('body-parser').json();
const Wizard = require(`${__dirname}/../models/wizard.js`);
const Film = require('../models/film.js');
const sendMessage = require('../lib/message.js');

const Router = module.exports = express.Router();

Router.post('/wizard', jsonParser ,(req, res, next) => {
    const newWizard = new Wizard(req.body);
    newWizard.save().then(message => res.send(message))
    .catch(err => next({error: err}));
});

Router.get('/wizard/:id', (req, res, next) => {
    Wizard.findOne({_id: req.params.id})
    .then(wizard => res.send(wizard))
    .catch(err => next({error: err}));
});

Router.get('/wizard', (req, res) => {
    Wizard.find(req.query || {})
        .then(wizards => res.send('We got all the wizards correctly'))
        .catch(err => res.send('nope'));
});

Router.put('/wizard/:id',jsonParser,  (req, res, next) => {
    if (typeof req.body['_id'] !== 'undefined') delete req.body._id;
    Wizard.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(data => res.send(data))
    .catch(err => next({error: err}));
});

Router.patch('/wizard/:id', jsonParser ,(req, res, next) => {
    if (typeof req.body._id !== 'undefined') delete req.body._id;
    Wizard.findOneAndUpdate({_id: req.params.id}, {$set: req.body}).then(data => res.send('Patched!')).catch(err => next({error: err}));
});

Router.delete('/wizard/:id', (req, res, next) => {
    Wizard.remove({_id: req.params.id}).then(res.send('Wizard Deleted!')).catch(err => next({error: err}));
});

Router.get('/film', (req, res) => {
    Film.find(req.query || {})
    .then(film => res.send(film))
    .catch(err => next({error: err}));
});

Router.get('/film/:id', (req, res) => {
    Film.findOne({_id: req.params.id})
    .then(wizard => res.send(wizard))
    .catch(err => next({error: err}));
});

Router.post('/film', jsonParser ,(req, res, next) => {
    const newFilm = new Film(req.body);
    newFilm.save().then(message => res.send(message))
    .catch(err => next({error: err}));
});

Router.put('/film/:id', jsonParser, (req, res) => {
    if (typeof req.body['_id'] !== 'undefined') delete req.body._id;
    Film.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(data => res.send(data))
    .catch(err => next({error: err}));
});

Router.delete('/film/:id', (req, res) => {
    Film.remove({_id: req.params.id})
    .then(res.send('Film Deleted!'))
    .catch(err => next({error: err}));
});

Router.patch('/film/:id', jsonParser, (req, res, next) => {
    if (typeof req.body._id !== 'undefined') delete req.body._id;
    Film.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(data => res.send('Patched!'))
    .catch(err => next({error: err})); 
});

Router.get('/associate/:film/:wizard', (req, res) => {
    const newWizard = new Wizard({title: req.params.wizard});
    newWizard.save().then(message => {
        const newFilm = new Film({title: req.params.film, Wizard: newWizard._id});
        newFilm.save().then(message => res.send(message));
});})

Router.get('/populate/:id', (req, res) => {

    Film.findOne({_id: req.params.id}).populate('Wizard').exec((err, reply) => {
        res.send(err || reply);
    });

});

