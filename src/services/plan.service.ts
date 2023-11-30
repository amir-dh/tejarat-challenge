import { Injectable, NotFoundException } from '@nestjs/common';
import { Plan } from 'src/db/entities/plan.entity';
import planRequest from 'src/model/plan.request.model';
import planResponse from 'src/model/plan.response.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanMapper } from 'src/mapper/plan.mapper';

@Injectable()
export class PlanService {

  constructor(@InjectRepository(Plan) private readonly planRepository: Repository<Plan>) { }

  async create(req: planRequest): Promise<any> {
    const data: Plan = PlanMapper.toEntity(req);
    const plan = await this.planRepository.save(data)

    return PlanMapper.toResponse(plan);
  }

  async update(id: number, req: planRequest): Promise<any> {
    const oldPlan = await this.planRepository.findOne({ where: { id } });

    if (!oldPlan) {
      throw new NotFoundException();
    }
    var newPlan = PlanMapper.toEntity(req);
    newPlan.id = oldPlan.id;
    const plan = await this.planRepository.save(newPlan)

    return PlanMapper.toResponse(plan);
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
      res.push(PlanMapper.toResponse(item));
    })

    return res;
  }

  async get(id: number): Promise<any> {
    const plan = await this.planRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException();

    return PlanMapper.toResponse(plan);
  }
}
