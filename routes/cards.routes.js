const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cards.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, cardsController.index);
router.get('/:id', secureMiddleware.isAuthenticated, cardsController.show);
router.post('/', secureMiddleware.isAuthenticated, cardsController.create);
router.put('/:id', secureMiddleware.isAuthenticated, cardsController.update);
router.delete('/:id', secureMiddleware.isAuthenticated, cardsController.destroy);

module.exports = router;
