/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from '../user.schema';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
    description: 'User password (min 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'User phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'User avatar URL',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({
    enum: UserType,
    default: UserType.CUSTOMER,
    description: 'User type (customer or staff)',
  })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;

  @ApiPropertyOptional({ description: 'Primary store ID (for staff members)' })
  @IsMongoId()
  @IsOptional()
  primaryStoreId?: string;

  @ApiPropertyOptional({ description: 'Organization ID (for staff members)' })
  @IsMongoId()
  @IsOptional()
  organizationId?: string;
}
