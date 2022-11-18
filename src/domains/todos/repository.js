const { Todos, Users, sequelize } = require('../../../db/models');

module.exports = {
  getAll: async function() {
    const result = await Todos.findAll();

    return result;
  },

  add: async function(userId, title, desc) {
    await Todos.create({
      userId, title, description: desc
    })
  },

  test: async function() {
    const id = 1;
    const [joined] = await sequelize.query(`select users.username as user_identity from todos left join users on todos.user_id = users.id where users.id = ${id}`);

    const todos = await Todos.findAll({
      // raw: true,
      include: [ 'users' ]
    });

    const users = await Users.findAll({
      // raw: true,
      include: [ 'todos' ]
    });

    console.log(todos['users.password']);

    return users;
  }
};
