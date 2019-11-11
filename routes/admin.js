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
                        res.status(401).send({ message: 'Unauthorized access: improper privileges'});
                    }
                }
            });
        } else {
            res.status(401).send({ message: 'Unauthorized access.' });
        }
    })

    /**
    * @swagger
    * /admin/stores:
    *   post:
    *     tags:
    *       - admin
    *     name: addStores
    *     summary: Add a new store to the system
    *     security:
    *       - bearerAuth: []
    *     consumes:
    *       - application/json
    *     parameters:
    *       - in: body
    *         name: body
    *         description: Store object
    *         required: true
    *         schema:
    *             $ref: "#/definitions/Store"
    *     responses:
    *       200:
    *         description: Return a new store.
    *       500:
    *         description: Something is wrong with the service. Please contact the system administrator.
    */
    router.post('/stores', (req, res) => {
        db.stores.insert(req.body, function(err, doc){
            res.json(doc);
        });
    });
    
    /**
    * @swagger
    * /admin/stores:
    *   get:
    *     tags:
    *       - admin
    *     name: stores
    *     summary: Get all stores in system
    *     security:
    *       - bearerAuth: []
    *     consumes:
    *       - application/json
    *     responses:
    *       200:
    *         description: List of all stores in system
    *       500:
    *         description: Something is wrong with service please contact system administrator
    */
    router.get('/stores', (req, res) => {
        var offset = Number(req.query.offset) || 0;
        var limit = Number(req.query.limit) || 3;
    
        db.stores.find({}).skip(offset).limit(limit, function (err, docs) {
            res.json(docs);
        })    
    });
    
    /**
    * @swagger
    * /admin/stores/{store_id}:
    *   get:
    *     tags:
    *       - admin
    *     name: getStoreById
    *     summary: Get a store from the system by its ID
    *     security:
    *       - bearerAuth: []
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: store_id
    *         in: path
    *         description: ID of the store
    *         required: true
    *         type: string
    *         default: '5db704ef3864c7524cd291ff'
    *     responses:
    *       200:
    *         description: List a single store from the system
    *       400:
    *           description: Invalid user request.
    *       401:
    *           description: Unauthorized access.
    *       500:
    *         description: Something is wrong with service please contact system administrator
    */
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