const Counter = require('../models/Counter');

exports.create = function (req, res) {
	let newCounter = {};
	if (req.type !== 'table') {
		newCounter = {
			item_id: req.item._id,
			type: req.type,
			count : 0
		};
	} else {
		newCounter = {
			table_id: req.table._id,
			type: req.type,
			count : 0
		};
	}

    const myCounter = new Counter(newCounter);
	myCounter.save(function(err, myCounter) {
		if (err) {
			res.json({success: false, result: [], messages: [err.message]});
		} else {
			res.json({success: true, result: newCounter, messages: []})
		}
	})
};

exports.update = function (req, res) {
	Counter.findOneAndUpdate({table_id: req.table._id}, { $inc: {count: 1}}, function(err, data) {
			if (err) {
				res.json({success: false, result: [], messages: [err.message]});
      		}
	});
	for (let i = 0; i<req.items.length; i++) {
		Counter.findOneAndUpdate({item_id: req.items[i].itemId}, { $inc: { count: req.items[i].itemQuantity}}, function(err, data){
      		if (err) {
				res.json({success: false, result: [], messages: [err.message]});
      		}
   		});

		if (i === req.items.length - 1) {
			res.json({success: true, result: [], messages: []});
		}
	}
};

exports.read = function (req, res) {
	let filter = {};
	if (req.body.type !== undefined && req.body.type !== null && req.body.type !== "") {
		filter = {
			"type": req.body.type
		}
	}
	Counter.find(filter,
		function (err, counters) {
			if (err) {
				res.json({success: false, result: [], messages: [err.message]});
			} else {
				res.json({success: true, result: counters, messages: []});
			}
		}
	).populate('item_id')
	 .populate('table_id');
};
