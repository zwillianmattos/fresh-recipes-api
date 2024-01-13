import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ChefEntity } from './entities/chef/chef.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/accounts/entities/account/account.entity';
import { BecomeChefDto } from './dto/become-chef.dto';

@Injectable()
export class ChefsService {
  constructor(
    @InjectRepository(ChefEntity)
    private readonly chefRepository: Repository<ChefEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}
  async becomeChef(accountId: number, becomeChefDto: BecomeChefDto): Promise<ChefEntity> {
    const account = await this.accountRepository.findOne({ where: { id: accountId }});
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    const existingChef = await this.chefRepository.findOne({
      where: {account: {id: account.id}}
    });
    if (existingChef) {
      throw new NotFoundException('User is already a chef');
    }
    if (!this.validateBrazilianCPF(becomeChefDto.cpf)) {
      throw new BadRequestException('Invalid Brazilian CPF');
    }
    if (!this.validateBrazilianRG(becomeChefDto.rg)) {
      throw new BadRequestException('Invalid Brazilian RG');
    }
    const newChef = this.chefRepository.create({ account, ...becomeChefDto });
    return await this.chefRepository.save(newChef);
  }

  private validateBrazilianCPF(cpf: string): boolean {
    // Lógica de validação de CPF (pode usar uma biblioteca como 'cpf' para isso)
    // Retorne true se válido, false se inválido
    // Exemplo simples:
    return /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(cpf);
  }

  private validateBrazilianRG(rg: string): boolean {
    // Lógica de validação de RG (pode usar uma biblioteca como 'rg' para isso)
    // Retorne true se válido, false se inválido
    // Exemplo simples:
    return /\d{2}\.\d{3}\.\d{3}-\d{1}/.test(rg);
  }
}
