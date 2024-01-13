import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountEntity } from './entities/account/account.entity';
import { LoginDto, RegistrationDto } from './dto/auth.dto';

@Controller('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('register')
  async register(@Body(ValidationPipe) registrationDto: RegistrationDto): Promise<AccountEntity> {
    return this.accountsService.register(registrationDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<AccountEntity> {
    return this.accountsService.login(loginDto);
  }

}
