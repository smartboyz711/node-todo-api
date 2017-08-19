var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text : {
        type : String
    },
    completed : {
        type : Boolean
    },
    completedAt : {
        type : Date
    }
});

// var newTodo = new Todo({
//     text : 'Sleep',
//     completed : true,
// });

// newTodo.save().then((docs) => {
//     console.log('Saved todo',docs);
// }, (e) => {
//     console.log('Unable to save todo');
// });

var OtherTodo = new Todo({
    text : 'Sleeps',
    completed : false,
    completedAt : new Date()
});


OtherTodo.save().then((docs) => {
    console.log('Saved todo',docs);
}, (e) => {
    console.log('Unable to save todo');
});