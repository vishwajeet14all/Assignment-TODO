const { db } = require('../database.js');
const ErrorHandler = require('../utils/errorHandler.js');


exports.getTodos = (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Page number, default is 1
    const pageSize = 5; // Number of items per page, default is 10
    const search = req.query.search || ''

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // Sample MySQL query with search and pagination
    const query = search.length != 0 ?
        `
    SELECT * FROM todolist
    WHERE task LIKE ? 
    LIMIT ?, ?
    `:
        `
    SELECT * FROM todolist
    LIMIT ?, ?
    `;

    console.log(query, 'query')
    // const query = 'SELECT * FROM `todolist` ';
    const searchParam = `%${search}%`;
    const queryArr =
        search.length == 0 ?
            [startIndex, pageSize] :
            [searchParam, startIndex, pageSize];


    db.query(query, queryArr, (err, results) => {
        if (err) {
            return next(new ErrorHandler(err.message), err.code);
        }
        res.status(200).json({
            success: true,
            results,
        })
    });
};


// Function to create a new to-do item
exports.createToDo = (req, res, next) => {

    const { task, status, userId } = req.body;
    const query = 'INSERT INTO `todolist` (`task`, `status`, `userId`) VALUES (?, ?, ?)';

    db.query(query, [task, status, userId], (err, results) => {
        if (err) {
            return next(new ErrorHandler(err.message, err.code));
        }

        return res.status(200).json({
            success: true,
            results,
        })
    })
};

// Function to update a to-do item
exports.updateToDo = (req, res, next) => {
    const { status, task, favourite } = req.body;
    const { id } = req.params;
    const query = 'UPDATE `todolist` SET `task` = ?, `status` = ?, `favourite`= ? WHERE `id` = ?';

    db.query(query, [task, status, favourite, id], (err, results) => {
        if (err) {
            return next(new ErrorHandler(err.message, err.code))
        }

        res.status(200).json({
            success: true,
            results
        })
    });
};

// Function to delete a to-do item
exports.deleteToDo = (req, res, next) => {
    const { id } = req.params
    const query = 'DELETE FROM `todolist` WHERE `id` = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return next(new ErrorHandler(err.message, err.code))
        }

        res.status(200).json({
            success: true,
            message: `Todo with id: ${id} delete successfully`
        })
    });
};

// Function to find a task by its name
exports.findTodo = (req, res, next) => {
    const { keyword } = req.query;
    const query = 'SELECT * FROM `todolist` WHERE `task` = ?';

    db.query(query, [keyword], (err, results) => {
        if (err) {
            return next(new ErrorHandler(err.message, err.code))
        }

        res.status(200).json({
            success: true,
            results
        })
    });
};