import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ChefEntity } from "src/chefs/entities/chef/chef.entity";
import { Repository } from "typeorm";
import { AccountEntity } from "./entities/account/account.entity";

@Injectable()
export class ChefAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(ChefEntity)
    private readonly chefRepository: Repository<ChefEntity>,) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.API_SECRET, });
      const userId = decoded.id;
      const isChef = await this.checkIfUserIsChef(userId);
      request.user = decoded;
      return isChef;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  private async checkIfUserIsChef(userId: number): Promise<boolean> {
    // Replace the logic below with your actual logic to check if the user is a chef
    // For example, you may want to check if the user is linked to a ChefEntity
    const chef = await this.chefRepository.findOne({ where: { account: { id: userId } } });
    return !!chef;
  }
}