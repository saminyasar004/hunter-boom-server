import dotenv from "dotenv";
dotenv.config();

export const port: number = parseInt(process.env.PORT || "3000");
export const dbConnectionString: string =
  process.env.DB_CONNECTION_STRING || "";
export const jwtSecret: string = process.env.JWT_SECRET || "";
export const jwtExpiresIn: number = parseInt(process.env.JWT_EXPIRES_IN || "");
export const defaultAdminName: string = process.env.DEFAULT_ADMIN_NAME || "";
export const defaultAdminUsername: string =
  process.env.DEFAULT_ADMIN_USERNAME || "";
export const defaultAdminEmail: string = process.env.DEFAULT_ADMIN_EMAIL || "";
export const defaultAdminPassword: string =
  process.env.DEFAULT_ADMIN_PASSWORD || "";
export const defaultAdminContactNumber: string =
  process.env.DEFAULT_ADMIN_CONTACT_NUMBER || "";
