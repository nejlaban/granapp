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
}

