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
    *       - stores
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
    *       400:
    *           description: Invalid user request.
    *       500:
    *         description: Something is wrong with the service. Please contact the system administrator.
    */
    router.post('/stores', (req, res) => {
        db.stores.insert(req.body, function(err, doc){
            if (err) {
                res.status(400).json({ message: `Insertion failed. Reason: ${err.errmsg}` });
            }
            res.json(doc);
        });
    });
    
    /**
    * @swagger
    * /admin/stores:
    *   get:
    *     tags:
    *       - stores
    *     name: stores
    *     summary: Get all stores in system
    *     parameters:
    *       - name: offset
    *         in: query
    *         description: The offset of the store list.
    *         type: integer
    *         default: 0
    *       - name: limit
    *         in: query
    *         description: The limit of the store list.
    *         type: integer
    *         default: 3
    *     security:
    *       - bearerAuth: []
    *     produces:
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
    *       - stores
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
    *         description: Something is wrong with the service. Please contact the system administrator.
    */
    router.get('/stores/:id', (req, res) => {
        var id = req.params.id;
        db.stores.findOne({_id: mongojs.ObjectId(id)},function (err, docs) {
            res.json(docs);
        })
    });
    
    /**
    * @swagger
    * /admin/stores/{store_id}:
    *   put:
    *     tags:
    *       - stores
    *     name: updateStore
    *     summary: Update store details.
    *     security:
    *       - bearerAuth: []
    *     consumes:
    *       - application/json
    *     produces:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: store_id
    *         description: ID of the store
    *         required: true
    *         type: string
    *         default: '5db704ef3864c7524cd291ff'
    *       - in: body
    *         name: body
    *         description: Store object
    *         required: true
    *         schema:
    *             $ref: "#/definitions/Store"
    *     responses:
    *       200:
    *         description: Return the updated store.
    *       500:
    *         description: Something is wrong with the service. Please contact the system administrator.
    */
    router.put('/stores/:id', (req, res) => {
        var id = req.params.id;
        var object = req.body
    
        db.stores.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: object },
            new: true
        }, function (err, doc, lastErrorObject) {
            if (err) {
                res.status(400).json({ message: `Update failed. Reason: ${err.errmsg}` });
            }
           res.json(doc);
        });
    });
    
    /**
    * @swagger
    * /admin/stores/{store_id}:
    *   delete:
    *     tags:
    *       - stores
    *     name: deleteStoreById
    *     summary: Delete a store from the system by its ID
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
    *         description: Successfully deletes a single store from the system
    *       400:
    *           description: Invalid user request.
    *       401:
    *           description: Unauthorized access.
    *       500:
    *         description: Something is wrong with the service. Please contact the system administrator.
    */
    router.delete('/stores/:id', (req, res) => {
        var id = req.params.id;
        db.stores.remove({ _id: mongojs.ObjectId(id) }, [true], function(err, docs){
            res.json(docs);
        });
    });
}