module.exports = (sequelize, Sequelize) => {

	const Task = sequelize.define('Task', {
		title: Sequelize.STRING,
        content: Sequelize.STRING,
        authorId: Sequelize.INTEGER
	});

    Task.associate = function(models) {
        Task.belongsTo(models.User, {foreignKey: 'authorId', as: 'author'})
    };
    
	return Task;

}