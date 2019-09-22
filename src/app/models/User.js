module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password : Sequelize.STRING
    }, {
        tableName : 'user'
    });
    
    User.findOneById = function(id) {
        return User.findOne({
            where: { id }
        });
    }

    return User;

}