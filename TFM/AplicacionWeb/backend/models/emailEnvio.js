// backend/models/emailSendControl.js

module.exports = (sequelize, DataTypes) => {
  const EmailSendControl = sequelize.define('EmailSendControl', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    last_sent_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'email_send_control',
    timestamps: false,
  });

  return EmailSendControl;
};
