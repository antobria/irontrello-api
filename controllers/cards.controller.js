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
 Card.findByIdAndUpdate(req.params.id,{ $set: req.body})
  .then(card => {
    if(!card){
      next(new ApiError('Card does not exist',404));
    }
    res.status(200).json({message: "Card modified ok"});
  })
  .catch(error => next(new ApiError('Error while editing the card',500))); 
};

module.exports.destroy = (req, res, next) => {
  Card.findOneAndRemove(req.params.id)
  .then(card => {
    if(!card){
      next(new ApiError('Card does not exist',404));
    }
    res.status(200).json({message: "Card deleted ok"});
  })
  .catch(error => next(new ApiError('Error while deleting the card',500))); 
};
