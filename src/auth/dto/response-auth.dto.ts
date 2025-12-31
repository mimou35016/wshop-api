import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiPropertyOptional({
    description: 'Refresh token for obtaining new access tokens',
  })
  refresh_token?: string;

  @ApiProperty({ description: 'User information' })
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    roles: string[];
  };
}
