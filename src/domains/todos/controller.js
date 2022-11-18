const { test } = require("./repository");
const repository = require("./repository");

module.exports = {
  list: async function(req, res) {
    const todos = await repository.getAll();

    return res.json(todos);
  },

  create: async function(req, res) {
    await repository.add(1, 'adalah', 'ada apa')
    return res.json({});
  },

  detail: async function(req, res) {
    return {};
  },

  update: async function(req, res) {
    return {};
  },

  delete: async function(req, res) {
    return {};
  },

  test: async function(req, res) {
    const result = await test();
    return res.json(result)
  }
};
