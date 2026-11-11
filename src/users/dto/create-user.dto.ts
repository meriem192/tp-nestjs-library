import { IsBoolean, IsInt, IsNotEmpty, IsNumber,
  IsPositive, IsString, Min, MinLength, IsEmail } from "class-validator";
export class CreateUserDto {
    @IsString()
  @MinLength(2)
  firstName: string;
 
  @IsString()
  @MinLength(2)
  lastName: string;
 
  @IsEmail()
  email: string;
 
  @IsInt()
  @Min(16)
  age: number;
 
  @IsBoolean()
  isActive: boolean;
}
