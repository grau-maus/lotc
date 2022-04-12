'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    }
  }, {});
  Article.associate = function (models) {
    Article.belongsTo(models.User, { foreignKey: 'userId' });
    Article.hasMany(models.Comment, { foreignKey: 'commentId', onDelete: 'CASCADE' })
  };
  return Article;
};
