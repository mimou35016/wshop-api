/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RevokeRoleDto } from './dto/revoke-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@ApiTags('User Roles')
@Controller('user-roles')
@ApiBearerAuth()
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post('assign')
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiResponse({ status: 201, description: 'Role assigned successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.userRolesService.assignRole(assignRoleDto);
  }

  @Post('revoke')
  @ApiOperation({ summary: 'Revoke a role from a user' })
  @ApiResponse({ status: 200, description: 'Role revoked successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  revokeRole(@Body() revokeRoleDto: RevokeRoleDto) {
    return this.userRolesService.revokeRole(revokeRoleDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all roles for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'User roles retrieved successfully',
  })
  findByUser(@Param('userId') userId: string) {
    return this.userRolesService.findByUser(userId);
  }

  @Get('user/:userId/permissions')
  @ApiOperation({ summary: 'Get all permissions for a user' })
  @ApiQuery({
    name: 'storeId',
    required: false,
    description: 'Filter by store context',
  })
  @ApiResponse({
    status: 200,
    description: 'User permissions retrieved successfully',
  })
  getUserPermissions(
    @Param('userId') userId: string,
    @Query('storeId') storeId?: string,
  ) {
    return this.userRolesService.getUserPermissions(userId, storeId);
  }

  @Get('me/permissions')
  @ApiOperation({ summary: 'Get permissions for current user' })
  @ApiQuery({
    name: 'storeId',
    required: false,
    description: 'Filter by store context',
  })
  @ApiResponse({
    status: 200,
    description: 'User permissions retrieved successfully',
  })
  getMyPermissions(@GetUser() user: any, @Query('storeId') storeId?: string) {
    return this.userRolesService.getUserPermissions(user.userId, storeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user role by ID' })
  @ApiResponse({ status: 200, description: 'User role retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User role not found' })
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user role (activate/deactivate)' })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }
}
