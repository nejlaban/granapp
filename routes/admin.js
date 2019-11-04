module.exports = (router, db, mongojs, jwt, config) => {

    router.use((req, res, next) => {
        console.log(`Admin route accessed by: ${req.ip}` ); // log visits

        /* Check for proper JWT */
        let authorization = req.get('Authorization');
        if (authorization) {
            jwt.verify(authorization, process.env.JWT_SECRET || config.JWT_SECRET, (error, decoded) => {
                if (error) {
                    res.status(401).send({ message: 'Unauthorized access: ' + error.message });
                } else {
                    let userType = decoded.type;
                    if (userType === 'admin') {
                        next();
                    } else {
                        res.status(401).send({ message: 'Unauthorized access: ' + error.message });
                    }
                }
            });
        } else {
            res.status(401).send({ message: 'Unauthorized access.' });
        }
    })

    router.post('/stores', (req, res) => {
        db.stores.insert(req.body, function(err, doc){
            res.json(doc);
        });
    });
    
    router.get('/stores', (req, res) => {
        var offset = Number(req.query.offset) || 0;
        var limit = Number(req.query.limit) || 3;
    
        db.stores.find({}).skip(offset).limit(limit, function (err, docs) {
            res.json(docs);
        })    
    });
    
    router.get('/stores/:id', (req, res) => {
        var id = req.params.id;
        db.stores.findOne({_id: mongojs.ObjectId(id)},function (err, docs) {
            res.json(docs);
        })
    });
    
    router.get('/stores/:id', (req, res) => {
        var id = req.params.id;
        db.stores.findOne({_id: mongojs.ObjectId(id)},function (err, docs) {
            res.json(docs);
        })
    });
    
    router.put('/stores/:id', (req, res) => {
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
    
    router.delete('/stores/:id', (req, res) => {
        var id = req.params.id;
        db.stores.remove({ _id: mongojs.ObjectId(id) }, [true], function(err, docs){
            res.json(docs);
        });
    });
}