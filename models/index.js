const User = require('./User');
const Food = require('./Food');

User.hasMany(Food, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Food };
