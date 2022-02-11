// add middlewares here related to actions
const Action = require('./actions-model');

const validateActionID = async (req, res, next) => {
    const { id } = req.params;
    try {
        const action = await Action.get(id);
        if(!action) {
            res.status(404).json({
                message: 'action not found'
            })
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        next(err);
    }
};

const validateAction = async (req, res, next) => {
    const { project_id, description, notes, completed } = req.body;
    if (project_id && description && notes && completed !== undefined ) {
        req.actionBody = req.body;
        next();
    } else {
        res.status(400).json({ message: 'Body required' })
    }
};

module.exports = {
    validateActionID,
    validateAction
};