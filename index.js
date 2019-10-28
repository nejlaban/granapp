const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/* MongoDB connection */
const mongojs = require('mongojs');
// Your connection string goes here.
const db = mongojs('mongodb+srv://contacts-user:contacts-user@contacts-app-ccb9h.mongodb.net/granapp?retryWrites=true&w=majority');

/* Body parser - enables use of JSON request body */
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/* Middleware to serve static content */
app.use(express.static('public')) // from the 'public' directory

app.get('/items', (req, res) => {
    let limit = Number(req.query.limit) || 5; // the number of results per page; defaults to 5
    let skip = Number(req.query.skip) || 0; // how many results to 'skip' - which page you are on; defaults to 0 (first page)
    db.items.find({ }).skip(skip).limit(limit, (error, docs) => {
        if (error) {
            throw error;
        }
        res.json(docs);
    });
});

app.get('/items/:id', (req, res) => {
    let id = req.params.id;
    db.items.findOne({ _id: mongojs.ObjectId(id) }, (error, docs) => {
        if (error) {
            throw error;
        }
        res.json(docs);
    });
});

app.get('/category/:name/items', (req, res) => {
    let category = req.params.name;
    db.items.find({ category: { $regex: category, $options: 'i' } }).sort({ name: 1 }, (error, docs) => {
        if (error) {
            throw error;
        }
        res.json(docs);
    });
});

app.post('/items', (req, res) => {
    db.items.insert(req.body, (error, docs) =>{
        res.json(docs);
    });
});

// app.put('/items/:id', (req, res) => {
//     let id = req.params.id;
//     let itemUpdate = req.body; 
//     db.items.updateOne({ _id: mongojs.ObjectId(id) }, { $set: itemUpdate }, (error, docs) => {
//         res.json(docs);
//     });
// });

app.put('/items/:id', (req, res) => {
    let id = req.params.id;
    let itemUpdate = req.body;
    db.items.findAndModify({ 
        query: { _id: mongojs.ObjectId(id) }, update: { $set: itemUpdate }, new: true
    }, (error, docs) => {
        res.json(docs);
    })
});

app.delete('/items/:id', (req, res) => {
    let id = req.params.id;
    db.items.remove({ _id: mongojs.ObjectId(id) }, [true], (error, docs) => {
        if (error) {
            throw error;
        }
        res.json(docs);
    });
});

app.get('/items/:id/stores', (req, res) => {
    let id = req.params.id;
    db.store_items.aggregate([
        { $match: { item_id: mongojs.ObjectId(id) } },
        { $lookup: { from: 'stores', localField: 'store_id', foreignField: '_id', as: 'store' }  },
        { $unwind: '$store' }, // unwind to get a single result from the $lookup array
        { $project: { price: 1, store: 1 } } // project only the required fields
    ], (error, docs) => {
        res.json(docs);
    });
});

app.get('/items/:id/cheapest', (req, res) => {
    let id = req.params.id;
    db.store_items.aggregate([ 
        { $match: { item_id: mongojs.ObjectId(id) } },
        { $sort: { price: 1 } },
        { $limit: 1 },
        { $lookup: { from: 'stores', localField: 'store_id', foreignField: '_id', as: 'store' } },
        { $lookup: { from: 'items', localField: 'item_id', foreignField: '_id', as: 'item' } },
        { $unwind: '$store' },
        { $unwind: '$item' },
        { $project: { item_name: '$item.name', price: 1, store_name: '$store.name', store_address: '$store.address' } } 
    ], (error, docs) => {
        res.json(docs);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}.`);
});

