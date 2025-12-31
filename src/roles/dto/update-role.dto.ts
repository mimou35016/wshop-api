/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionScope } from '../../permissions/permission.schema';

export class UpdateRoleDto {
  @ApiProperty({ example: 'store_manager', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Store manager with full store access',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: PermissionScope,
    example: PermissionScope.STORE,
    required: false,
  })
  @IsEnum(PermissionScope)
  @IsOptional()
  scope?: PermissionScope;

  @ApiProperty({
    type: [String],
    example: ['507f1f77bcf86cd799439011'],
    required: false,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  permissions?: string[];

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
