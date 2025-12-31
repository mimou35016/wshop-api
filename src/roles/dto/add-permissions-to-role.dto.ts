/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddPermissionsToRoleDto {
  @ApiProperty({
    type: [String],
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    description: 'Array of permission IDs to add',
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  permissionIds: string[];
}
