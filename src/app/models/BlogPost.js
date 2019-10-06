module.exports = (sequelize, Sequelize) => {

	const BlogPost = sequelize.define('BlogPost', {
		title: Sequelize.STRING,
        content: Sequelize.STRING,
        authorId: Sequelize.INTEGER
	});

    BlogPost.associate = function(models) {
        BlogPost.belongsTo(models.User, {foreignKey: 'authorId', as: 'author'})
    };
    
	return BlogPost;

}