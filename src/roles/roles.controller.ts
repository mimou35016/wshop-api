import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AddPermissionsToRoleDto } from './dto/add-permissions-to-role.dto';
import { RemovePermissionsFromRoleDto } from './dto/remove-permissions-from-role.dto';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role (super_admin or organization_admin)',
  })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles or filter by scope' })
  @ApiQuery({
    name: 'scope',
    required: false,
    description: 'Filter by scope (system, organization, store)',
  })
  @ApiResponse({ status: 200, description: 'Roles retrieved successfully' })
  findAll(@Query('scope') scope?: string) {
    if (scope) {
      return this.rolesService.findByScope(scope);
    }
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({ status: 200, description: 'Role retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update role (super_admin or organization_admin)' })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Post(':id/permissions/add')
  @ApiOperation({ summary: 'Add permissions to role' })
  @ApiResponse({ status: 200, description: 'Permissions added successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  addPermissions(
    @Param('id') id: string,
    @Body() addPermissionsDto: AddPermissionsToRoleDto,
  ) {
    return this.rolesService.addPermissions(id, addPermissionsDto);
  }

  @Post(':id/permissions/remove')
  @ApiOperation({ summary: 'Remove permissions from role' })
  @ApiResponse({ status: 200, description: 'Permissions removed successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  removePermissions(
    @Param('id') id: string,
    @Body() removePermissionsDto: RemovePermissionsFromRoleDto,
  ) {
    return this.rolesService.removePermissions(id, removePermissionsDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete role (super_admin only, cannot delete system roles)',
  })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
