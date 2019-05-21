const Table = require('../models/Table');

exports.create = function (req, res) {
    var newTable = {
        number: req.body.number,
        seats: req.body.seats
    };
    const myTable = new Table(newTable);
    myTable.save(function (err, table) {
        if (err) {
            res.json({success: false, result: [], messages: [err.message]});
        } else {
            res.json({success: true, result: table, messages: []});
        }
    });
};

exports.update = function (req, res) {
    var updatedTable = {
        number: req.body.number,
        seats: req.body.seats
    };

    Table.update({"_id": req.body._id}, {$set: updatedTable},
        function (err, table) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: table, messages: []});
            }
        }
    )
};

exports.delete = function (req, res) {
    Table.remove({"_id": req.params.id},
        function (err, table) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: table, messages: []});
            }
        }
    )
};

exports.read = function (req, res) {
    Table.find({},
        function (err, tables) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: tables, messages: []});
            }
        }
    )
};