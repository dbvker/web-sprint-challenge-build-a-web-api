// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const { validateActionID, validateAction } = require('./actions-middlware');

const Action = require('./actions-model');

router.get('/', (req, res, next) => {
    Action.get()
        .then((actions) => {
            res.status(200).json(actions);
        }).catch(next);
});

router.get('/:id', validateActionID, (req, res, next) => {
    const action = req.action;
    res.json(action);
});

router.post('/', validateAction, (req, res, next) => {
    Action.get(req.actionBody.project_id)
        .then((id) => {
            if (id) {
                Action.insert(req.actionBody).then((action) => {
                    res.status(201).json(action);
                });
            } else {
                res.status(404).json({ message: "Project doesn't exist" });
            }
        }).catch(next);
});

router.put('/:id', validateActionID, validateAction, (req, res, next) => {
    Action.update(req.action.id, req.actionBody)
        .then(update => {
            res.json(update)
        }).catch(next);
});

router.delete('/:id', validateActionID, (req, res, next) => {
    Action.remove(req.action.id)
        .then(deleted => {
            res.json(deleted);
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
