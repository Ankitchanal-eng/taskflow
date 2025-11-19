const Task = require('../models/Task');

//Get all tasks for the authenticated user
exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.body }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error '});
    }
};


// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = new Task ({
            title,
            description,
            status,
            user: req.user.id,  // Automatically assign the authenticated user's ID
        });

        const createTask = await task.save();
        res.status(201).json(createdTask);
    } catch (err) {
        res.status(400).json({ message: err.maggage });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // SECURITY CHECK: Ensure the task belongs to the authenticated user
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this task'});
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return the update document
            runValidators: true,
        });

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Tasl not found' })
        }

        //SECURITY CHECK: Ensure the task belongs to the authenticated user
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        await Task.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Task remove successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

