const express = require('express');
const { getTodos, deleteToDo, updateToDo, createToDo, findTodo } = require('../controllers/todo');
const authenticatedUser = require('../middleware/auth');
const router = express.Router();

router.route('/todos').get(getTodos);
router.route('/todo/:id').delete(deleteToDo);
router.route('/todo/:id').put(updateToDo);
router.route('/todo/add').post(createToDo);
router.route('/todo/search').get(findTodo);

module.exports = router;
