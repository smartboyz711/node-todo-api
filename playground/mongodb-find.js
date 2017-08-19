//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');
    
    // db.collection('Todos').find({
    //     _id : new ObjectID('5997e9414a83d987657d0eb5')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // })

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count : ',count);
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // })

    db.collection('Users').find({
        name : 'Theedania'
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        console.log('Unable to fetch todos',err);
    })


    db.close();
});