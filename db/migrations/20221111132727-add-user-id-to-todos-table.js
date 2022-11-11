module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('todos', 'user_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('todos', 'user_id');
  }
};
