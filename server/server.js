const port = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var express = require('express')

var {mongoose} = require('./db/mongooose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
app.post('/todos',(req,res) => {
    console.log(req.body);
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port,()=>{
    console.log('Server is up op port '+port);
});