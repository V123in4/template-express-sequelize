const { Users } = require('../../../db/models');

module.exports = {
  register: async function(username, password) {
    await Users.create({
      username,
      password
    })
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
