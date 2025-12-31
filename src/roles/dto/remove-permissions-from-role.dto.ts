/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class RemovePermissionsFromRoleDto {
  @ApiProperty({
    type: [String],
    example: ['507f1f77bcf86cd799439011'],
    description: 'Array of permission IDs to remove',
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  permissionIds: string[];
}
