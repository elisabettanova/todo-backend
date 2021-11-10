var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');

router.get('/', function(request, response, next) {
  Todo.all((err, todos) => response.format({
    json: () =>{
      response.status(200).json(todos);
    }
  }));
});

router.get('/:id', function(request, response, next) {
  const id = request.params.id;
  Todo.one(id, (err, todo) => response.format({
    json: () =>{
      response.status(200).json(todo);
    }
  }));
});

router.post('/', (request, response) => {
  const newTodo = request.body;
  Todo.add(newTodo);
  response.status(201).json();
});

router.put('/:id', (request, response) => {
  const id = request.params.id;
  const updatedTodo = request.body;
  updatedTodo.id = parseInt(id);
  Todo.update(updatedTodo, (err, data) => {
    if(err)
    {
      response.status(404, 'The task is not found').send();
    } else {
      response.status(204).send(data);
    }
  });
});

router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id);
  Todo.delete(id, (err) => {
    if(err){
      response.status(404).send();
    }else{
      response.status(200).send();
    }
  });
});

module.exports = router;
