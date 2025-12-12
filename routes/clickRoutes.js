const express = require('express');
const router = express.Router();
const controller = require('../controllers/clickController');

router.get('/', controller.getCount);
router.post('/', controller.incrementClick);
router.post('/reset', controller.resetCount);
router.get('/history', controller.getHistory);
router.get('/entry/:id', controller.getEntryById);

module.exports = router;
