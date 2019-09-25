const { User } = require("../models");

module.exports = {

    findOneById: function(req, res) {
        User.findOne({ where: { id : req.params.id }})
        .then(user => user ? res.status(200).send(user) : res.status(204).send("Could not find any correspondent user"))
        .catch(res.status(500).send("Internal server error"));
    },

    create: function(req, res) {
        User.create(req.body)
        .then(user => res.status(200).send(user))
        .catch(res.status(500).send("Internal server error"));
    },

    signIn: function(req, res) {
        User.verifyCredentials(req.body.email, req.body.password)
        .then(user => user ? res.status(200).send({ token : `Barear ${user.getBarearToken()}` }) : res.status(400).send("Bad Request"))
        .catch(err => res.status(500).send('Internal server error'));
    }
}