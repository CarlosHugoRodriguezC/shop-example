import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RoleProtected } from './decorators/';
import { RawHeaders } from 'src/common/decorators/';
import { UserEntity } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { UserValidRole } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: UserEntity,
    @GetUser(['id', 'email']) userPartial: Partial<UserEntity>,
    @GetUser('id') userId: string,
    @RawHeaders() headers: any,
  ) {
    return {
      success: true,
      message: 'You are authorized',
      user,
      userPartial,
      userId,
      headers,
    };
  }

  @Get('private2')
  @RoleProtected(UserValidRole.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser() user: UserEntity) {
    return {
      success: true,
      message: 'You are authorized',
      user,
    };
  }

  @Get('private3')
  @Auth(UserValidRole.ADMIN, UserValidRole.USER)
  testingPrivateRoute3(@GetUser() user: UserEntity) {
    return {
      success: true,
      message: 'You are authorized',
      user,
    };
  }
}
