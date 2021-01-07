const express = require('express');
const router = express.Router();

// middlewares
const auth = require('../../middlewares/auth');

// models
const Item = require('../../models/Item');

// @route      GET /api/items
// @desc       Get all items
// @access     Public
router.get('/', async (req, res) => {
	try {
		const items = await Item.find().sort({ date: -1 });

		res.json(items);
	} catch (err) {
		console.error(err.message);
	}
});

// @route      POST /api/items
// @desc       Create an item
// @access     Public
router.post('/', auth, async (req, res) => {
	try {
		const item = new Item({ name: req.body.name });

		item.save();

		res.json(item);
	} catch (err) {
		console.error(err.message);
	}
});

// @route      DELETE /api/items/:item_id
// @desc       Delete an item
// @access     Public
router.delete('/:item_id', auth, async (req, res) => {
	try {
		const item = await Item.findById(req.params.item_id);
		if (!item) {
			return res.status(404).json({ success: false, msg: 'Item not found' });
		}

		await item.remove();

		res.json({ success: true });
	} catch (err) {
		console.error(err.message);
		res.json({ success: false });
	}
});

module.exports = router;
