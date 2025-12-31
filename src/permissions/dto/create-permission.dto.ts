/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PermissionAction, PermissionScope } from '../permission.schema';

export class CreatePermissionDto {
  @ApiProperty({ example: 'Create Orders' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'orders',
    description: 'Resource name like orders, products, users',
  })
  @IsString()
  @IsNotEmpty()
  resource: string;

  @ApiProperty({ enum: PermissionAction, example: PermissionAction.CREATE })
  @IsEnum(PermissionAction)
  @IsNotEmpty()
  action: PermissionAction;

  @ApiProperty({ enum: PermissionScope, example: PermissionScope.STORE })
  @IsEnum(PermissionScope)
  @IsNotEmpty()
  scope: PermissionScope;

  @ApiProperty({
    example: 'Allows creating orders in a store',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
