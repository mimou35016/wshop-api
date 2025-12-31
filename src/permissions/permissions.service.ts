/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './permission.schema';
import { Model } from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    try {
      const permission = new this.permissionModel(createPermissionDto);
      return await permission.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Permission with resource ${createPermissionDto.resource}, action ${createPermissionDto.action}, and scope ${createPermissionDto.scope} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findByResource(resource: string): Promise<Permission[]> {
    return this.permissionModel.find({ resource }).exec();
  }

  async findByScope(scope: string): Promise<Permission[]> {
    return this.permissionModel.find({ scope }).exec();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async findByIds(ids: string[]): Promise<Permission[]> {
    return this.permissionModel.find({ _id: { $in: ids } }).exec();
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    try {
      const permission = await this.permissionModel
        .findByIdAndUpdate(id, updatePermissionDto, { new: true })
        .exec();

      if (!permission) {
        throw new NotFoundException(`Permission with ID ${id} not found`);
      }
      return permission;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Permission with these attributes already exists',
        );
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.permissionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
  }
}
