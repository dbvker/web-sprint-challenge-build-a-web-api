// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const { validateProjectID, validateProject } = require('./projects-middleware');


const Project = require('./projects-model');

router.get('/', (req, res, next) => {
    Project.get()
        .then((projects) => {
            res.status(200).json(projects);
        }).catch(next);
});

router.get('/:id', validateProjectID, (req, res) => {
    const project = req.project;
    res.json(project);
});

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.projectBody)
        .then((project) => {
            res.status(201).json(project);
        }).catch(next);
});

router.put('/:id', validateProjectID, validateProject, (req, res, next) => {
    Project.update(req.project.id, req.projectBody)
        .then(update => {
            res.json(update)
        }).catch(next);
});

router.delete('/:id', validateProjectID, (req, res, next) => {
    Project.remove(req.project.id)
        .then(deleted => {
            res.json(deleted);
        }).catch(next);
});


router.get('/:id/actions', validateProjectID, (req, res, next) => {
    Project.getProjectActions(req.project.id)
        .then(projectIDActions => {
            res.json(projectIDActions)
        }).catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'There was an error in actions router.',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;