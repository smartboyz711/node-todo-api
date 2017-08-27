const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongooose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user'); 

// var id = '599daa2cda395f2578d50a9311';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not vaild');
// }

// Todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('Todos',todos)
// });

// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     console.log('Todo',todo)
// })

// Todo.findById(id).then((todo) => {
//     if(todo){
//        return console.log('Todo BY Id', todo);
//     }
// }).catch((e) => console.log(e));

var user_id = '599afdd7c5a0d5214071ef71'

User.findById(user_id).then((users) => {
    if(users){
       return console.log('User BY Id', JSON.stringify(users, undefined, 2));
    }
    console.log('Unable to find user')
}).catch((e) => console.log(e));

