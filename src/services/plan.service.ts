import { Injectable, NotFoundException } from '@nestjs/common';
import { Plan } from 'src/db/entities/plan.entity';
import planRequest from 'src/model/plan.request.model';
import planResponse from 'src/model/plan.response.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {

  constructor(@InjectRepository(Plan) private readonly planRepository: Repository<Plan>) { }

  async create(req: planRequest): Promise<any> {
    const data: Plan = new Plan();
    data.name = req.name;
    data.price = req.price;
    const res: planResponse = new planResponse();
    const plan = await this.planRepository.save(data)
    res.id = plan.id;
    res.name = plan.name;
    res.price = plan.price;
    res.createdTime = plan.createdTime;
    res.updatedTime = plan.updatedTime;
    return res;
  }

  async update(id: number, req: planRequest): Promise<any> {
    const oldPlan = await this.planRepository.findOne({ where: { id } });

    if (!oldPlan) {
      throw new NotFoundException();
    }

    oldPlan.name = req.name;
    oldPlan.price = req.price;
    const res: planResponse = new planResponse();
    const plan = await this.planRepository.save(oldPlan)
    res.id = plan.id;
    res.name = plan.name;
    res.price = plan.price;
    res.createdTime = plan.createdTime;
    res.updatedTime = plan.updatedTime;
    return res;
  }

  async delete(id: number): Promise<any> {
    const plan = await this.planRepository.findOne({ where: { id } });

    if (!plan) {
      throw new NotFoundException();
    }

    await this.planRepository.remove(plan);
  }

  async getAll(): Promise<any> {
    const plan = await this.planRepository.find();
    const res: Array<planResponse> = new Array();
    plan.map(item => {
      const plan: planResponse = new planResponse();

      plan.id = item.id;
      plan.name = item.name;
      plan.price = item.price;
      plan.createdTime = item.createdTime;
      plan.updatedTime = item.updatedTime;

      res.push(plan);
    })

    return res;
  }

  async get(id: number): Promise<any> {
    const plan = await this.planRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException();

    const res: planResponse = new planResponse();

    res.id = plan.id;
    res.name = plan.name;
    res.price = plan.price;
    res.createdTime = plan.createdTime;
    res.updatedTime = plan.updatedTime;
    
    return res;
  }
}
