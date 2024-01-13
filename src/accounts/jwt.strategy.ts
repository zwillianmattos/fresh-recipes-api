import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AccountsService } from './accounts.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_SECRET,
    });
  }

  validate(payload: { id: number; email: string }): {
    id: number;
    email: string;
  } {
    const { id, email } = payload;
    return { id, email };
  }
}