//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5997cb014cf9433410a35c00')
    // }, {
    //     $set : {
    //         completed : true
    //     }
    // },{
    //     returnOriginal : false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5997cbd7c7c4ed26289317f9')
    }, {
        $set : {
            name : 'theedanai',
        },
        $inc : {
            age :  1
        }
    },{
        returnOriginal : false
    }).then((result) => {
        console.log(result);
    });

    db.close();
});