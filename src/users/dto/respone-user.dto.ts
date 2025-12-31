import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus, UserType } from '../user.schema';

export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  _id: string;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'User first name' })
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  lastName: string;

  @ApiPropertyOptional({ description: 'User phone number' })
  phone?: string;

  @ApiPropertyOptional({ description: 'User avatar URL' })
  avatar?: string;

  @ApiProperty({ enum: UserType, description: 'User type (customer or staff)' })
  userType: UserType;

  @ApiProperty({ enum: UserStatus, description: 'User account status' })
  status: UserStatus;

  @ApiPropertyOptional({ description: 'Primary store ID' })
  primaryStoreId?: string;

  @ApiPropertyOptional({ description: 'Organization ID' })
  organizationId?: string;

  @ApiProperty({ description: 'Whether the user account is active' })
  isActive: boolean;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'User last update date' })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'User roles (from UserRole collection)',
    type: [String],
  })
  roles?: string[];
}
