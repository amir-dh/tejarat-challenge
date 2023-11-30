import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import subRequest from 'src/model/sub.request.model';
import subResponse from 'src/model/sub.response.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subsctiption } from 'src/db/entities/sub.entity';
import { Request } from 'express';
import { PlanService } from './plan.service';
import { UserService } from './user.service';

@Injectable()
export class SubService {

    constructor(
        @InjectRepository(Subsctiption) private readonly subRepository: Repository<Subsctiption>,
        private planService: PlanService,
        private userService: UserService
    ) { }

    async create(subRequest: subRequest, req: Request): Promise<any> {
        const plan = await this.planService.get(subRequest.planId);
        const userId = req.headers['userId'];
        if (!userId || Array.isArray(userId)) throw new InternalServerErrorException(); 
        const user = await this.userService.get(parseInt(userId));
        if (await this.subRepository.exist({ where: { planId: plan.id, userId: user.id } }))
            throw new ConflictException("subscription is already exist!!!")

        const data: Subsctiption = new Subsctiption();
        data.planId = plan.id;
        data.userId = user.id;
        this.subRepository.save(data);
    }

    async delete(id: number, req: Request): Promise<any> {
        const userId = req.headers['userId'];
        if (!userId || Array.isArray(userId)) throw new InternalServerErrorException();

        const data = await this.subRepository.findOne({ where: { id, userId: Number(userId) } });
        if (!data) throw new NotFoundException();
        await this.subRepository.delete(data);
    }

    async getAll(req: Request): Promise<any> {
        const userId = req.headers['userId'];
        if (!userId || Array.isArray(userId)) throw new InternalServerErrorException();

        const user = await this.userService.get(parseInt(userId));

        const data = await this.subRepository.find({ where: { userId: Number(userId) } });
        const res: Array<subResponse> = new Array();
        
        for (const item of data) {
            const resItem: subResponse = new subResponse();

            const plan = await this.planService.get(item.planId);
      
            resItem.id = item.id;
            resItem.username = user.username;
            resItem.price = plan.price;
            resItem.createdTime = item.createdTime;
            resItem.updatedTime = item.updatedTime;
      
            res.push(resItem);
            
        }
    
        return res;
    }
}
