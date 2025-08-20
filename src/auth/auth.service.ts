import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import User, { UserCreationProps } from "@/model/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { hashedPassword } from "@/lib";
import {
  defaultAdminContactNumber,
  defaultAdminEmail,
  defaultAdminName,
  defaultAdminPassword,
  defaultAdminUsername,
} from "@/config/dotenv.config";
import { RegisterDto } from "./dto/register.dto";

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
      name: defaultAdminName,
      contactNumber: defaultAdminContactNumber,
      userGroup: "admin",
      userLevel: "admin",
      permission: "admin",
      username: defaultAdminUsername,
      email: defaultAdminEmail,
      password: await hashedPassword(defaultAdminPassword),
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

  async findUserByEmail(
    loginDto: LoginDto,
  ): Promise<User | UserCreationProps | null> {
    try {
      const user = await this.userModel.findOne({
        where: {
          email: loginDto?.email,
        },
      });

      if (user) {
        return user.toJSON();
      }
      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async createUser(
    registerDto: RegisterDto,
  ): Promise<User | UserCreationProps | null> {
    try {
      const createdUser = await this.userModel.create(registerDto);

      if (createdUser) {
        return createdUser.toJSON();
      }
      return null;
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
