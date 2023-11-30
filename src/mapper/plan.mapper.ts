import { Plan } from 'src/db/entities/plan.entity';
import planRequest from 'src/model/plan.request.model';
import planResponse from 'src/model/plan.response.model';

export class PlanMapper {
    static toEntity(req: planRequest): Plan {
        const data: Plan = new Plan();

        data.name = req.name;
        data.price = req.price;
        data.duration = req.duration;
        data.durationType = req.durationType;

        return data
    }

    static toResponse(entity: Plan) {
        const res: planResponse = new planResponse();

        res.id = entity.id;
        res.name = entity.name;
        res.price = entity.price;
        res.duration = entity.duration;
        res.durationType = entity.durationType;
        res.createdTime = entity.createdTime;
        res.updatedTime = entity.updatedTime;

        return res;
    }
}