const { Task } = require('../../domain/models');
const RequestError = require('../utils/error/RequestError');

module.exports = {

    findAll: (req, res) => {
        new RequestError(501).thorw();
    },

    findOneById: (req, res) => {
        new RequestError(501).thorw();
    },

    create: (req, res, next) => {
        Task.build({
            title : req.body.title,
            content : req.body.content,
            authorId : req.user.id
        })
        .then(task => task.save(req.body))
        .then(task => res.status(200).send( task ))
        .catch(err => next(err));
    },

    update: (req, res) => {
        new RequestError(501).thorw()
    },

    delete: (req, res) => {
        new RequestError(501).thorw();
    }
}