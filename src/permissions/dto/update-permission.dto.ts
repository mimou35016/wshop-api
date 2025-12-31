/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PermissionAction, PermissionScope } from '../permission.schema';

export class UpdatePermissionDto {
  @ApiProperty({ example: 'Create Orders', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'orders', required: false })
  @IsString()
  @IsOptional()
  resource?: string;

  @ApiProperty({
    enum: PermissionAction,
    example: PermissionAction.CREATE,
    required: false,
  })
  @IsEnum(PermissionAction)
  @IsOptional()
  action?: PermissionAction;

  @ApiProperty({
    enum: PermissionScope,
    example: PermissionScope.STORE,
    required: false,
  })
  @IsEnum(PermissionScope)
  @IsOptional()
  scope?: PermissionScope;

  @ApiProperty({
    example: 'Allows creating orders in a store',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
