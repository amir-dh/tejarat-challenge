import { Status } from "src/db/entities/sub.entity";

export default class user {
    id: number;
    username: string;
    price: number;
    status: Status;
    from: Date;
    to: Date;
    createdTime: Date;
    updatedTime: Date;
}