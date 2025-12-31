/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsOptional, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionScope } from '../../permissions/permission.schema';

export class RevokeRoleDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439012', description: 'Role ID' })
  @IsMongoId()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({ enum: PermissionScope, example: PermissionScope.STORE })
  @IsEnum(PermissionScope)
  @IsNotEmpty()
  scope: PermissionScope;

  @ApiProperty({
    example: '507f1f77bcf86cd799439013',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  scopeId?: string;
}
