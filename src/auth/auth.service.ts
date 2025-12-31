/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
import { UserType } from 'src/users/user.schema';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { RolesService } from 'src/roles/roles.service';
import { PermissionScope } from 'src/permissions/permission.schema';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  email?: string;
  sub: string;
  userType: string;
  roles: string[];
  isGuest?: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private userRolesService: UserRolesService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user: any = await this.usersService.create({
      ...registerDto,
      userType: UserType.CUSTOMER,
    });

    // Assign default customer role if it exists
    try {
      const customerRole = await this.rolesService.findByName('customer');
      if (customerRole) {
        await this.userRolesService.assignRole({
          userId: user._id.toString(),
          roleId: (customerRole as any)._id.toString(),
          scope: PermissionScope.SYSTEM,
        });
      }
    } catch (error) {
      // Customer role doesn't exist yet, skip assignment
      console.log('Customer role not found, skipping role assignment');
    }

    // Get user roles after assignment
    const userRoles = await this.userRolesService.findByUser(
      user._id.toString(),
    );
    const roleNames = userRoles
      .map((ur: any) => ur.roleId?.name)
      .filter(Boolean);

    const payload: JwtPayload = {
      email: user.email,
      sub: user._id.toString(),
      userType: user.userType,
      roles: roleNames,
      isGuest: false,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        roles: roleNames,
      },
    };
  }
}
