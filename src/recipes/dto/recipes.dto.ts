import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";
import { IsArrayOfObjects } from "src/validators/IsArrayOfObjects.validator";

export class RecipesDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly time: string;

  @IsNotEmpty()
  @IsString()
  readonly difficulty: string;

  @IsNotEmpty()
  @IsString()
  readonly calories: string;

  @IsNotEmpty()
  @IsString()
  readonly proteins: string;

  @IsNotEmpty()
  @IsString()
  readonly carbs: string;

  @IsNotEmpty()
  @IsString()
  readonly fats: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  readonly photos?: number[];

  @IsNotEmpty()
  @IsArray()
  steps: string[];

  @IsNotEmpty()
  @IsArrayOfObjects({ message: 'Ingredients must be an array of objects' })
  @IsArray()
  @IsOptional()
  ingredients: Array<{
    ingredient: number;
    quantity: number;
    unit: string;
  }>;
}

export class UpdateRecipesDto{
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly time?: string;

  @IsOptional()
  @IsString()
  readonly difficulty?: string;

  @IsOptional()
  @IsString()
  readonly calories?: string;

  @IsOptional()
  @IsString()
  readonly proteins?: string;

  @IsOptional()
  @IsString()
  readonly carbs?: string;

  @IsOptional()
  @IsString()
  readonly fats?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  readonly photos?: number[];

  @IsOptional()
  @IsArray()
  steps?: string[];
  
  @IsNotEmpty()
  @IsArrayOfObjects({ message: 'Ingredients must be an array of objects' })
  @IsArray()
  @IsOptional()
  ingredients?: Array<{
    ingredient: number;
    quantity: number;
    unit: string;
  }>;
}