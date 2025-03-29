import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signup(email: string, password: string) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new UnauthorizedException("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.create({ email, password: hashedPassword });

    return { message: "User created successfully" };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("Invalid email or password");

    const token = this.jwtService.sign({ email: user.email, id: user._id });
    return { token };
  }
}
