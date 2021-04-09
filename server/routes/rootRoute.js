const express = require('express');
const router = express.Router();

const { getAllController } = require('../controllers/getAllController');
const { createBoardController } = require('../controllers/createBoardController');
const { updateBoardController } = require('../controllers/updateBoardController');
const { deleteCardController } = require('../controllers/deleteCardController');
const { closeBoardController } = require('../controllers/closeBoardController');
const { updateCurrentBoardController } = require('../controllers/updateCurrentBoardController');
const { createSectionController } = require('../controllers/createSectionController');
const { updateSectionController } = require('../controllers/updateSectionController');
const { createCardController } = require('../controllers/createCardController');
const { updateCardController } = require('../controllers/updateCardController');

// ROUTE: get all objects
router.get('/', getAllController);

// ROUTE: /create/board/
// body: Board (json object)
router.post('/create/board/', createBoardController);

// ROUTE: /update/board/
// body: Board (json object)
router.post('/update/board/', updateBoardController);

// ROUTE: /delete/card/
// body: Card (json object)
router.post('/delete/card/', deleteCardController);

// ROUTE: /closeboard/
// body: Board (json object)
router.post('/closeboard/', closeBoardController);

// ROUTE: /setcurrentboard/
// body: Board (json object)
router.post('/setcurrentboard/', updateCurrentBoardController);

// ROUTE: /create/section/
// body: Section (json object)
router.post('/create/section/', createSectionController);

// ROUTE: /update
router.post('/update/section/', updateSectionController);

// ROUTE: /create/card/
// body: Card (json object)
router.post('/create/card/', createCardController);

// ROUTE: /update/card/
// body: Card (json object)
router.post('/update/card/', updateCardController);

module.exports = router;
