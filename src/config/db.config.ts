import { Sequelize } from "sequelize-typescript";
import path from "path";
import { dbConnectionString } from "./dotenv.config";
import Product from "@/model/product.model";
import AgentGroup from "@/model/agent-group.model";

export const sequelize = new Sequelize(dbConnectionString, {
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  models: [path.resolve(__dirname, "../model")],
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    Product.associate();
    AgentGroup.associate();
    // Sync models after database creation
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!".green);
  } catch (err: any) {
    console.log(err);
    console.error("Error initializing database: ".red, err.message);
  }
};
