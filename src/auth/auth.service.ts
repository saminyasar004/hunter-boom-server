import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import User from "@/model/user.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async onModuleInit() {
    // Check if the table is empty to avoid duplicate insertions
    const userCount = await this.userModel.count();
    if (userCount === 0) {
      console.log("Inserting initial admin data...");
      await this.insertInitialAdmin();
    } else {
      console.log("Admin already exist, skipping initialization.");
    }
  }

  async insertInitialAdmin() {
    const initialAdmin = {
      name: "Admin",
      contactNumber: "1234567890",
      userGroup: "admin",
      userLevel: "admin",
      permission: "admin",
      username: "admin",
      email: "admin@example.com",
      password: "123456",
      status: "active",
      isDeleted: false,
    };

    try {
      await this.userModel.create(initialAdmin);
      console.log("Initial admin inserted successfully.");
    } catch (error) {
      console.error("Error inserting initial admin", error);
    }
  }

  async login(loginDto: LoginDto): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({
        where: {
          email: loginDto?.email,
          password: loginDto?.password,
        },
      });

      if (user) {
        return user;
      }
      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
