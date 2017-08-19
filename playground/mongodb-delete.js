//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text : 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    // db.collection('Users').deleteMany({name : 'Theedania'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text : 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text : 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndDelete({
        _id :  new ObjectID('5997cd1788a67c3db8fcac43')
    }).then((result) => {
        console.log(result);
    });



    db.close();
});