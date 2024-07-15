import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: false,
  },
  openTime: {
    type: DataTypes.DATE,
    allowNull: true,
    set(value) {
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      this.setDataValue("openTime", date);
    },
  },
  closeTime: {
    type: DataTypes.DATE,
    allowNull: true,
    set(value) {
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      this.setDataValue("closeTime", date);
    },
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255], // Password length validation
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "mechanic", "user"),
    allowNull: false,
  },
});

export default User;
