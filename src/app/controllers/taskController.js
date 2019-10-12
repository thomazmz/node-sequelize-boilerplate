
const RequestError = require("../errors/RequestError");

module.exports = {

    findOneById: (req, res) => {
        new RequestError(501).thorw()
    },

    create: (req, res) => {
        new RequestError(501).thorw()
    },

    update: (req, res) => {
        new RequestError(501).thorw()
    },

    delete: (req, res) => {
        new RequestError(501).thorw()
    }

}