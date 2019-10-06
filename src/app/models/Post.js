module.exports = (sequelize, Sequelize) => {

	const Post = sequelize.define('Post', {
		title: Sequelize.STRING,
        content: Sequelize.STRING,
        authorId: Sequelize.INTEGER
	}, {
		tableName: 'post'
    });

    User.associate = function(models) {
        User.belongsTo(models.User, {foreignKey: 'authorId', as: 'author'})
    };
    
	return Post;

}