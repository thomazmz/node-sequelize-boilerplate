const ApplicationError = require("../errors/ApplicationError");
const { BlogPost } = require("../models");

module.exports = {

  findOneById: (request, response) => {
    BlogPost.findOne({ where: { id : req.params.id }})
    .then(blogPost => blogPost ? response.status(200).send(blogPost) : new ApplicationError({ status: 204 }).throw())
    .catch(error => ApplicationError.send(response, error));
  },

  create: (request, response) => {
    response.status(200).send("Create blog post feature not available yet");
  },

  update: (request, response) => {
    response.status(200).send("Update blog post feature not available yet");
  },

  delete: (request, response) => {
    response.status(200).send("Delete blog post feature not available yet");
  }
}