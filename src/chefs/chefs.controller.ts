import { Body, Controller, Request, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { AuthGuard } from '@nestjs/passport';
import { BecomeChefDto } from './dto/become-chef.dto';

@Controller('chefs')
export class ChefsController {
  constructor(private readonly chefsService: ChefsService) {}

  @Post('become-chef')
  @UseGuards(AuthGuard('jwt'))
  async becomeChef(@Request() req, @Body(ValidationPipe) becomeChefDto: BecomeChefDto): Promise<any> {
    const accountId = req.user.id;
    console.log(accountId)
    await this.chefsService.becomeChef(accountId, becomeChefDto);
    return {
      message: 'User has become a chef',
    };
  }
}
