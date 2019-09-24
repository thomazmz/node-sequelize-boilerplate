const { User } = require("../models");

module.exports = {

    findOneById: function(req, res) {
        User.findOne({ where: { id : req.params.id }})
        .then(user => user ? res.status(200).send(user) : res.status(204).send("Could not find any correspondent user"))
        .catch(err => res.status(500).send("Internal server error"));
    },

    create: function(req, res) {
        User.create(req.body)
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send("Internal server error"));
    },

    signIn: function(req, res) {
        User.findOne({ where: { email : req.params.email }})
        .then(user => user ? User.verifyCredentials(user, req.body.password) : res.status(401).send("Invalid credentials"))
        .then(user => user ? user.getBarearToken() : res.status(401).send("Invalid credentials"))
        .then(token => res.status(200).send(token))
        .catch(err => res.status(500).send("Internal server error"));
    }

}