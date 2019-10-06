module.exports = (sequelize, Sequelize) => {

	const Post = sequelize.define('Post', {
		title: Sequelize.STRING,
		content: Sequelize.STRING,
	}, {
		tableName: 'post'
    });
    
	return Post;

}