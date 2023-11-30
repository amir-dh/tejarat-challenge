import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import subRequest from 'src/model/sub.request.model';
import subResponse from 'src/model/sub.response.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status, Subsctiption } from 'src/db/entities/sub.entity';
import { Request } from 'express';
import { PlanService } from './plan.service';
import { UserService } from './user.service';
import Utils from 'src/utils/utils';

@Injectable()
export class SubService {

    constructor(
        @InjectRepository(Subsctiption) private readonly subscriptionRepository: Repository<Subsctiption>,
        private planService: PlanService,
        private userService: UserService
    ) { }

    async create(subRequest: subRequest, req: Request): Promise<any> {
        const plan = await this.planService.get(subRequest.planId);
        const userId = req.headers['userId'];
        if (!userId || Array.isArray(userId)) throw new InternalServerErrorException(); 

        const user = await this.userService.get(parseInt(userId));
        const exist = await this.subscriptionRepository.findOne({ where: { planId: plan.id, userId: user.id } });
        if (exist) throw new ConflictException("subscription is already exist!!!")

        const data: Subsctiption = new Subsctiption();
        data.planId = plan.id;
        data.userId = user.id;
        data.status = Status.INCOMPLETE;
        data.from = new Date();
        data.to = Utils.durationToDate(plan.duration, plan.durationType);
        this.subscriptionRepository.save(data);
    }

    async paid(id: number, req: Request): Promise<any> {
        const userId = req.headers['userId'];
        if (!userId || Array.isArray(userId)) throw new InternalServerErrorException(); 

        const user = await this.userService.get(parseInt(userId));
        const subscription = await this.subscriptionRepository.findOne({ where: { id, userId: user.id } });
        if (!subscription) throw new NotFoundException('subscription id is wrong!!');
        subscription.status = Status.COMPLETE;
        this.subscriptionRepository.save(subscription);
    } 

    async delete(id: number, req: Request): Promise<any> {
        const userId = req.headers['userId'];
        if (!userId || Array.isArray(userId)) throw new InternalServerErrorException();

        const data = await this.subscriptionRepository.findOne({ where: { id, userId: Number(userId) } });
        if (!data) throw new NotFoundException();
        await this.subscriptionRepository.remove(data);
    }

    async getAll(req: Request): Promise<any> {
        const userId = req.headers['userId'];
        if (!userId || Array.isArray(userId)) throw new InternalServerErrorException();

        const user = await this.userService.get(parseInt(userId));

        const data = await this.subscriptionRepository.find({ where: { userId: Number(userId) } });
        const res: Array<subResponse> = new Array();
        
        for (const item of data) {
            const resItem: subResponse = new subResponse();

            const plan = await this.planService.get(item.planId);
      
            resItem.id = item.id;
            resItem.username = user.username;
            resItem.price = plan.price;
            resItem.from = item.from;
            resItem.to = item.to;
            resItem.status = item.status;
            resItem.createdTime = item.createdTime;
            resItem.updatedTime = item.updatedTime;
      
            res.push(resItem);
            
        }
    
        return res;
    }
}
