const mongoose = require('mongoose');
const Card = require('../models/card.model');
const ApiError = require('../models/api-error.model');

module.exports.index = (req, res, next) => {
 Card.find()
 .then(cards => res.json(cards))
 .catch(error => next (error));
};

module.exports.show = (req, res, next) => {
  Card.findById(req.params.id)
  .then(card => res.json(card))
  .catch(error => next(error));
};

module.exports.create = (req, res, next) => {
  if (!req.body.title) {
   next(new ApiError ('Missing title', 400));
  }
  card = new Card(req.body);
  card.save()
    .then( card => {
      console.log(card);
      res.status(200).json({message:'Card created'});  
    })
    .catch(error => next(new ApiError('Error while creating the card',500)));
};

module.exports.update = (req, res, next) => {
  
};

module.exports.destroy = (req, res, next) => {
};
