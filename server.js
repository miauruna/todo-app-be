const Todo = require('./todoModel');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8001;
const DB_URL = process.env.DB_URL;

// Declaring middleware
app.use(express.json());
app.use(cors());
mongoose.connect(
	DB_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) throw err;
		console.log('MongoDB connection established');
	}
);
app.use('/users', require('./routes/users'));

// create a task ---- { id: 't1', title: 'Do Dishes', type: 'Time sensitive' done: true },
app.get('/', (req, res) => {
	res.send('hello from the app');
});

//add todo
app.post('/add-todo', async (req, res) => {
	const incomingData = req.body;
	const newTodo = new Todo(incomingData);
	await newTodo.save();
	res.send(newTodo);
});
// get all todos
app.get('/todos', async (req, res) => {
	const allTodos = await Todo.find({});
	res.send(allTodos);
});

app.get('/todo/:id', async (req, res) => {
	const { id } = req.params;
	const currentTodo = await Todo.findById(id);
	res.send(currentTodo);
});
// update
app.put('/todo/:id', async (req, res) => {
	const { id } = req.params;
	const { title, completed } = req.body;
	const currentTodo = await Todo.findByIdAndUpdate(id, {
		completed: completed,
		title: title,
	});
	res.json({ message: 'success' });
});

// delete
app.delete('/todo/:id', async (req, res) => {
	const { id } = req.params;
	const deletedTodo = await Todo.findByIdAndDelete(id);
	res.send('deleted');
});

function listenCallback() {
	console.log('listening...Miruna is impatient');
}
app.listen(port, listenCallback);
