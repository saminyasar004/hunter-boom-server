import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import User from "@/model/user.model";

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    try {
      // const user = await User.findOne({
      //   where: {
      //     email: loginDto?.email,
      //     password: loginDto?.password,
      //   }
      // })
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
