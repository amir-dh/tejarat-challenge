import { Body, ConflictException, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import userRequest from 'src/model/user.request.model';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() req: userRequest): any {
      return this.userService.create(req);
    }
}
