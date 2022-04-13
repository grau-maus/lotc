'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Articles' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    }
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Comment.belongsTo(models.Article, { foreignKey: 'articleId', onDelete: 'CASCADE' })
  };
  return Comment;
};
