const Order = require('../models/Order');

exports.create = function (req, res, next) {
    console.log('req.body.table : ', req.body.table);
    var newOrder = {
        table: {
            _id: req.body.table._id,
            number: req.body.table.number,
        },
        items: req.body.items,
        total: req.body.total
    };
    const myOrder = new Order(newOrder);
    myOrder.save(function (err, order) {
        if (err) {
            res.json({success: false, result: [], messages: [err.message]});
        } else {
            // res.json({success: true, result: order, messages: []});
            console.log('order created : : ', order);
            req.items = order.items;
            req.table = order.table;
            next();
        }
    });
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
    // Order.find({}, function(err, orders) {
    //     if (err) {
    //         res.json({success: false, result: [], messages: [err.message]});
    //     } else {
    //         res.json({success: true, result: orders, messages: []});
    //     }
    // })

};