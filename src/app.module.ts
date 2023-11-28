import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './db/config.service';
import { User } from './db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
