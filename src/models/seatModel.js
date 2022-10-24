import { DataTypes } from "sequelize";
import { sequelizeDB } from "../db/dbLib.js";

const seatModel = sequelizeDB.define("seats", {
  seatNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default seatModel;
