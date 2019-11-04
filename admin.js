module.exports = function(app, db){
    app.use(function (req, res, next) {
        console.log('Admin Time:', Date.now())
        next()
    })

    app.post('/stores', function(req, res){
        db.stores.insert(req.body, function(err, doc){
            res.json(doc);
        });
    });
    
    app.get('/stores', function(req, res){
        var offset = Number(req.query.offset) || 0;
        var limit = Number(req.query.limit) || 3;
    
        db.stores.find({}).skip(offset).limit(limit, function (err, docs) {
            res.json(docs);
        })    
    });
    
    app.get('/stores/:id', function(req, res){
        var id = req.params.id;
        db.stores.findOne({_id: mongojs.ObjectId(id)},function (err, docs) {
            res.json(docs);
        })
    });
    
    app.get('/stores/:id', function(req, res){
        var id = req.params.id;
        db.stores.findOne({_id: mongojs.ObjectId(id)},function (err, docs) {
            res.json(docs);
        })
    });
    
    app.put('/stores/:id', function(req, res){
        var id = req.params.id;
        var object = req.body
    
        db.stores.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: object },
            new: true
        }, function (err, doc, lastErrorObject) {
           res.json(doc);
        });
    });
    
    app.delete('/stores/:id', function(req, res){
        var id = req.params.id;
        db.stores.remove({ _id: mongojs.ObjectId(id) }, [true], function(err, docs){
            res.json(docs);
        });
    });
}