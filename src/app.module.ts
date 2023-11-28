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

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, Plan]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [UserController, PlanController],
  providers: [UserService, PlanService],
})
export class AppModule {}
