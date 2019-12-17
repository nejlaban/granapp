module.exports = (router, db, mongojs) => {

    /* Visit-logging middleware */
    router.use((req, res, next) => {
        console.log(`New visit from ${req.ip} at ${new Date()}` ); // log visits
        next();
    });

    /**
    * @swagger
    * /public/version:
    *   get:
    *     tags:
    *       - system
    *     name: version
    *     summary: Check system version
    *     produces:
    *       - application/json
    *     responses:
    *       200:
    *         description: Returns the version of the system running
    *         schema:
    *             $ref: "#/definitions/SystemInformation"
    *       500:
    *         description: Something is wrong with the service. Please contact the system administrator.
    */
    router.get('/version', (req, res) => {
        res.json({
            app_name: 'GranApp',
            version: 'v1.0.0'
        });
    });

    /** ITEM ROUTES */
    router.get('/items', (req, res) => {
        let limit = Number(req.query.limit) || 5; // the number of results per page; defaults to 5
        let skip = Number(req.query.skip) || 0; // how many results to 'skip' - which page you are on; defaults to 0 (first page)
        db.items.find({ }).skip(skip).limit(limit, (error, docs) => {
            if (error) {
                throw error;
            }
            res.json(docs);
        });
    });

    router.get('/items/:id', (req, res) => {
        let id = req.params.id;
        db.items.findOne({ _id: mongojs.ObjectId(id) }, (error, docs) => {
            if (error) {
                throw error;
            }
            res.json(docs);
        });
    });
}