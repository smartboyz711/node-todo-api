const {Object} = require('mongodb');

const {mongoose} = require('./../server/db/mongooose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('59a80888815b1137e6784012').then((todo) => {
    console.log(todo);
});

