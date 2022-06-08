const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	title: String,
	type: String,
	color: String,
	completed: Boolean,
});

module.exports = mongoose.model('Todo', todoSchema);
