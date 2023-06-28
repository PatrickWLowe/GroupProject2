const User = require('./User');
const Food = require('./Food');

User.hasMany(Food, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Food.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Food };
