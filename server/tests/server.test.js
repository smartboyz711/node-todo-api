const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos',() => {
    it('should create a new todo',(done) => {
        var text = 'test todo hello';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data',(done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos',() => {
    it('should return all todos',(done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos:id',() => {
    it('should return todo By ID',(done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found',(done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if non-object ids',(done) => {
        request(app)
            .get(`/todos/aadadweawewewaew`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos:id',() => {
    it('should remove todo By ID',(done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todos) => {
                    expect(todos).toNotExist;
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found',(done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if non-object ids',(done) => {
        request(app)
            .delete(`/todos/aadadweawewewaew`)
            .expect(404)
            .end(done);
    });    
});

describe('PATCH /todos:id',() => {
    it('should Update todo By ID',(done) => {
        var text = "Something todo test update by ID : completed true";
        var hexId = todos[0]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed : true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completed At when todo is not completed',(done) => {
        var text = "Something todo test update by ID : completed false";
        var hexId = todos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed : false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist;
            })
            .end(done);
    });

    it('should return 404 if todo not found',(done) => {
        request(app)
            .patch(`/todos/${new ObjectID().toHexString}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if non-object ids',(done) => {
        request(app)
            .patch(`/todos/aadadweawewewaew`)
            .expect(404)
            .end(done);
    });    
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
  
    it('should return 401 if not authenticated', (done) => {
        done();
    });
});
