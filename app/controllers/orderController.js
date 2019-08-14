const Order = require('../models/Order');

exports.create = function (req, res, next) {
    var hasCoffee = false;
    var hasCake = false;
    var newOrder = {
        table: {
            _id: req.body.table._id,
            number: req.body.table.number,
        },
        items: req.body.items,
        total: req.body.total,
        type: ''
    };
    for (var i = 0; i < req.body.items.length; i++) {
        if (req.body.items[i].itemType === 'coffee') {
            hasCoffee = true;
        } else if (req.body.items[i].itemType === 'cake') {
            hasCake = true
        }

        if (i === req.body.items.length - 1) {
            if (hasCoffee === true && hasCake === true) {
                newOrder.type = 'mixed';
            } else if (hasCoffee === true) {
                newOrder.type = 'coffee';
            } else if (hasCake === true) {
                newOrder.type = 'cake';
            }   

            const myOrder = new Order(newOrder);
            myOrder.save(function (err, order) {
                if (err) {
                    res.json({success: false, result: [], messages: [err.message]});
                } else {
                    req.items = order.items;
                    req.table = order.table;
                    next();
                }
            });
        }
    }
    
};

exports.read = function (req, res) {
    const responseJSON = {success: false, result: [], messages: [], pagination: []}
    
    let queryOptions = {};
    let query = {};

    queryOptions = {
            page: req.query.pageIndex ? req.query.pageIndex * 1 : 1,
            limit: req.query.limit ? req.query.limit * 1 : 10,
            sort: '-updatedAt'
        }    

    Order.paginate(query, queryOptions)
        .then(function (queryResult) {

            responseJSON.success = true;
                responseJSON.docs = queryResult.docs;
                responseJSON.pagination = {
                    total: queryResult.total,
                    limit: queryResult.limit,
                    page: queryResult.page,
                    pages: queryResult.pages
                };
                res.status(200).json(responseJSON)

    })

};

exports.count = function(req, res) {
    let filter = {};
    if (req.body.orderType !== null && req.body.orderType !== undefined && req.body.orderType !== "") {
        filter = {
            type : req.body.orderType
        }
    }
    Order.find(filter).count(function(err, count) {
        if (err) {
            res.json({success: false, result: [], messages: [err.message]});
        } else {
            res.json({success: true, result: count, messages: []});
        }
    })
}
