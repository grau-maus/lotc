'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dislike = sequelize.define('Dislike', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Articles' }
    }
  }, {});
  Dislike.associate = function (models) {
    Dislike.belongsTo(models.User, { foreignKey: 'userId' });
    Dislike.belongsTo(models.Article, { foreignKey: 'articleId' });
  };
  return Dislike;
};
