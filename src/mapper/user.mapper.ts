import userRequest from 'src/model/user.request.model';
import userResponse from 'src/model/user.response.model';
import { User as userEntity } from 'src/db/entities/user.entity';

export class UserMapper {

    static toEntity(req: userRequest) {
        const entity: userEntity = new userEntity();
        entity.username = req.username;
        entity.password = req.password;
        entity.isActive = true;

        return entity;
    }

    static toResponse(entity: userEntity) {
        const res: userResponse = new userResponse();
        res.username = entity.username;
        res.isActive = entity.isActive;
        res.createdTime = entity.createdTime;
        res.updatedTime = entity.updatedTime;
        return res;
    }
}