require('../server/config/config');
const port = process.env.PORT;

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongooose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());
app.post('/todos',(req,res) => {
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send({error : e});
    });
});

app.get('/todos',(req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send({error : e});
    });
});

app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({error : "ID not vaild"});
    }
    Todo.findById(id).then((todo) => {
        if(todo){
            res.send({todo});
        }else{
            res.status(404).send({error : "Unable to find user"});
        }
    }).catch(e => {
        res.status(400).send({error : e});
    });
});

app.delete('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({error : "ID not vaild"});
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(todo){
            res.send({todo});
        }else{
            res.status(404).send({error : "Unable to find user"});
        }
    }).catch(e => {
        res.status(400).send({error : e});
    });
});

app.patch('/todos/:id',(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({error : "ID not vaild"});
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set: body}, {new : true}).then((todo) => {
        if(!todo){
            return res.status(404).send({error : "Unable to find user"});
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send({error : e});
    })
});

app.post('/users',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send({error : e});
    });
});

app.get('/users/me',authenticate,(req,res) => {
    res.send(req.user);
});

app.post('/users/login',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    if(!(body.email && body.password)){
        return res.send({error : 'Invaild Data.'});
    }
    User.findByCredentials(body.email, body.password).then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send({error : e});
    });
});


app.listen(port,()=>{
    console.log('Server is up at port '+port);
});

module.exports = {app};