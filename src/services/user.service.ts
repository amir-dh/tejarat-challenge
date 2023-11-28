import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as userEntity } from 'src/db/entities/user.entity';
import userRequest from 'src/model/user.request.model';
import userResponse from 'src/model/user.response.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>) { }

  async create(req: userRequest): Promise<any> {
    const data: userEntity = new userEntity();
    data.username = req.username;
    data.password = req.password;
    data.isActive = true;
    const isExist = await this.userRepository.exist({ where: { username: req.username } })
    if (isExist) {
      throw new HttpException('User already exists!!', HttpStatus.BAD_REQUEST);
    } else { 
      const res: userResponse = new userResponse();
      const user = await this.userRepository.save(data)
      res.username = user.username;
      res.isActive = user.isActive;
      res.createdTime = user.createdTime;
      res.updatedTime = user.updatedTime;
      return res; 
    };
  }
}
