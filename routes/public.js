module.exports = (router) => {

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
    *       - System
    *     name: version
    *     summary: Check version of system
    *     consumes:
    *       - application/json
    *     responses:
    *       200:
    *         description: Return version of system running
    *       500:
    *         description: Something is wrong with service please contact system administrator
    */
    router.get('/version', (req, res) => {
        res.json({
            app_name: 'GranApp',
            version: 'v1.0.0'
        });
    });
}

