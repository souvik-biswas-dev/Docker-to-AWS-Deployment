const Todo = require('../models/Todo');

// Get all todos with optional filtering
const getAllTodos = async (req, res, next) => {
    try {
        const { completed, priority, sort = '-createdAt' } = req.query;
        const filter = {};

        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }
        if (priority) {
            filter.priority = priority;
        }

        const todos = await Todo.find(filter).sort(sort).exec();
        res.json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (err) {
        next(err);
    }
};

// Create a new todo
const createTodo = async (req, res, next) => {
    try {
        const { title, priority, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'Title is required and cannot be empty' });
        }

        const todo = await Todo.create({
            title: title.trim(),
            priority: priority || 'medium',
            dueDate
        });

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: todo
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        next(err);
    }
};

// Update a todo
const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Prevent updating sensitive fields
        delete updates._id;
        delete updates.createdAt;

        if (updates.title !== undefined && !updates.title.trim()) {
            return res.status(400).json({ error: 'Title cannot be empty' });
        }

        const todo = await Todo.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({
            success: true,
            message: 'Todo updated successfully',
            data: todo
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid todo ID' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        next(err);
    }
};

// Delete a todo
const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({
            success: true,
            message: 'Todo deleted successfully',
            data: todo
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid todo ID' });
        }
        next(err);
    }
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
