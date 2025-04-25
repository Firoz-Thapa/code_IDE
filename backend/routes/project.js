const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel'); // Adjust the path if necessary

// Create a new project
router.post('/createProject', async (req, res) => {
    const { title, userId } = req.body;

    try {
        const newProject = new Project({
            title,
            userId,
            date: new Date(),
            htmlCode: "<h1>Hello World</h1>", // Default HTML code
            cssCode: "body { background-color: #f4f4f4; }", // Default CSS code
            jsCode: "// JavaScript code here" // Default JS code
        });

        const savedProject = await newProject.save();
        res.json({ success: true, projectId: savedProject._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating project' });
    }
});

// Fetch all projects for a user
router.post('/getProjects', async (req, res) => {
    const { userId } = req.body;

    try {
        const projects = await Project.find({ userId });
        res.json({ success: true, projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching projects' });
    }
});

// Get a specific project
router.post('/getProject', async (req, res) => {
    const { userId, projId } = req.body;

    try {
        const project = await Project.findOne({ _id: projId, userId });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching project' });
    }
});

// Update a project
router.post('/updateProject', async (req, res) => {
    const { userId, projId, htmlCode, cssCode, jsCode } = req.body;

    try {
        const updatedProject = await Project.findOneAndUpdate(
            { _id: projId, userId },
            { htmlCode, cssCode, jsCode },
            { new: true }
        );
        
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        
        res.json({ success: true, message: 'Project updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating project' });
    }
});

// Delete a project
router.delete('/deleteProject/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting project' });
    }
});

module.exports = router;