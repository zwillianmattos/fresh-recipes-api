import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountEntity } from './entities/account/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationDto, LoginDto } from './dto/auth.dto';
import { cryptoPassword } from 'src/utisl';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async register(registrationDto: RegistrationDto): Promise<any> {
    const { email, password, phone_number, name, profilePhoto } = registrationDto;
    const existingUser: AccountEntity = await this.accountRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const newUser = this.accountRepository.create({
      email,
      password,
      phone_number,
      name,
      profilePhoto,
    });
    await this.accountRepository.save(newUser);
    const token = this.jwtService.sign({ id: newUser.id, email: newUser.email });
    return { ...newUser, token };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.accountRepository.findOne({
      where: { email: email, password: cryptoPassword(password) }, relations: ['chef']
    });
    if (!user) {
      throw new BadRequestException('email or password is invalid');
    }
    const isChef = (typeof user.chef?.id !== "undefined");
    const token = this.jwtService.sign({ id: user.id, email: user.email, isChef: isChef });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      isChef: isChef,
      token: token,
    };
  }
}