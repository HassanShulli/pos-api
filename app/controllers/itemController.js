const Item = require('../models/Item');

exports.create = function (req, res) {

    var newItem = {
        name: req.body.name,
        price: req.body.price,
        fileName: req.body.fileName,
        type: req.body.type
    };
    const myItem = new Item(newItem);
    myItem.save(function (err, item) {
        if (err) {
            res.json({success: false, result: [], messages: [err.message]});
        } else {
            res.json({success: true, result: item, messages: []});
        }
    });
};

exports.update = function (req, res) {
    var updatedItem = {
        name: req.body.name,
        price: req.body.price,
        fileName: req.body.fileName,
        type: req.body.type
    };

    Item.update({"_id": req.body._id}, {$set: updatedItem},
        function (err, item) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: item, messages: []});
            }
        }
    )
};

exports.delete = function (req, res) {
    Item.remove({"_id": req.params.id},
        function (err, item) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: item, messages: []});
            }
        }
    )
};

exports.read = function (req, res) {
    Item.find({},
        function (err, items) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: items, messages: []});
            }
        }
    )
};
