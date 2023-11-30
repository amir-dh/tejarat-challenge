import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './db/config.service';
import { User } from './db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { PlanController } from './controller/plan.controller';
import { PlanService } from './services/plan.service';
import { Plan } from './db/entities/plan.entity';
import { Subsctiption } from './db/entities/sub.entity';
import { SubController } from './controller/sub.controller';
import { SubService } from './services/sub.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, Plan, Subsctiption]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [UserController, PlanController, SubController],
  providers: [UserService, PlanService, SubService],
})
export class AppModule {}
