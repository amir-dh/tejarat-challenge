import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { User as userEntity } from 'src/db/entities/user.entity';
import userRequest from 'src/model/user.request.model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from 'src/mapper/user.mapper';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>,
    private jwtService: JwtService
  ) { }

  async create(req: userRequest): Promise<any> {
    const isExist = await this.userRepository.exist({ where: { username: req.username } })
    if (isExist) {
      throw new HttpException('User already exists!!', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.save(UserMapper.toEntity(req));
    return UserMapper.toResponse(user);
  }

  async login(req: userRequest): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username: req.username, isActive: true } });
    if (!user?.password || !compareSync(req.password, user?.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user?.id, username: user?.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async get(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: id, isActive: true } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
