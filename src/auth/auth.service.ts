import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getDBErrorMessage } from 'src/common/constants/error-codes.constant';
import { CreateUserDto, LoginUserDto } from './dto';
import { exclude } from 'src/common/helpers/exclude.helper';
import * as bcrypt from 'bcryptjs';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { UserEntity } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

type UserWithoutPassword = Omit<UserEntity, 'password'>;
export interface AuthResponse extends ApiResponse<UserWithoutPassword> {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateUserDto): Promise<AuthResponse> {
    try {
      const { password } = createAuthDto;
      const passwordHashed = bcrypt.hashSync(password, 10);

      const user = await this.prismaService.user.create({
        data: {
          ...createAuthDto,
          password: passwordHashed,
        },
      });

      delete user.password;

      return {
        success: true,
        data: exclude(user, ['password']) as UserWithoutPassword,
        token: this.getJwtToken({ email: user.email, uid: user.id }),
      };

      // TODO: add JWT token
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = loginUserDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      success: true,
      data: exclude(user, ['password']) as UserWithoutPassword,
      token: this.getJwtToken({ email, uid: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);

    return token;
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    if (error.code.startsWith('P')) {
      const message = getDBErrorMessage(error.code, error.meta.target);
      throw new BadRequestException(message);
    }

    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
