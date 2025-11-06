import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUserByEmail(email: string) {
    // MVP: find user by email; password omitted
    const user = await (this.usersService as any).userModel.findOne({ email });
    return user || null;
  }

  async login(user: any) {
    if (!user) throw new UnauthorizedException();
    const payload = { sub: user._id, email: user.email, role: user.role || 'user' };
    return { access_token: this.jwtService.sign(payload) };
  }
}