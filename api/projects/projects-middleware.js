// add middlewares here related to projects
const Project = require('./projects-model');

const validateProjectID = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project.get(id);
        if(!project) {
            res.status(404).json({
                message: 'project not found'
            })
        } else {
            req.project = project;
            next();
        }
    } catch (err) {
        next(err);
    }
};

const validateProject = async (req, res, next) => {
    const { description, name, completed } = req.body;
    if (description && name && completed !== undefined ) {
        req.projectBody = req.body;
        next();
    } else {
        res.status(400).json({ message: 'Body required' })
    }
};

module.exports = {
    validateProjectID,
    validateProject
};