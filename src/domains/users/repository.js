const { Users } = require('../../../db/models');

module.exports = {
  register: async function(username, password) {
    await Users.create({
      username,
      password
    })
  },

  getUserById: async function(id) {
    const user = await Users.findOne({
      where: {
        id
      },
      raw: true
    });

    return user;
  },

  getUserByUsername: async function(username) {
    const user = await Users.findOne({
      where: {
        username
      },
      raw: true
    });

    return user;
  }
};
