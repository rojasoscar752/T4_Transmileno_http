const express = require('express');
const { addOrUpdateBus, deleteBus, getBus } = require('../controllers/busController');
const router = express.Router();

router.post('/', addOrUpdateBus);
router.delete('/:plate', deleteBus);
router.get('/:plate', getBus);

module.exports = router;
