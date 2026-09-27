const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const taskController = require('../controllers/taskController');

router.use(auth);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/status', taskController.updateStatus);

module.exports = router;
