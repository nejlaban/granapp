const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000

const db = mongojs('mongodb+srv://web-eng:web-eng@ibu-web-programming-b7utm.gcp.mongodb.net/granapp?retryWrites=true&w=majority', []);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/stores', function(req, res){
    db.stores.insert(req.body, function(err, doc){
        res.json(doc);
    });
});

app.get('/stores', function(req, res){
    var offset = Number(req.query.offset) || 0;
    var limit = Number(req.query.limit) || 3;

    db.stores.find({}).skip(offset).limit(limit, function (err, docs) {
        res.json(token);
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 