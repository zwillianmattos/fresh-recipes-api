import { IsNotEmpty, IsString } from "class-validator";

export class BecomeChefDto {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  rg: string;
}
