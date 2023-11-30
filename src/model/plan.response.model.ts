import { DurationType } from "src/db/entities/plan.entity";

export default class user {
    id: number;
    name: string;
    price: number;
    duration: number;
    durationType: DurationType;
    createdTime: Date;
    updatedTime: Date;
}