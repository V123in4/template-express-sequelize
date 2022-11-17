const { Todos } = require('../../../db/models');

module.exports = {
  getAll: async function() {
    const result = await Todos.findAll();

    return result;
  },

  add: async function(userId, title, desc) {
    await Todos.create({
      userId, title, description: desc
    })
  }
};
