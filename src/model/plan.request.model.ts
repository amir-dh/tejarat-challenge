import { IsNotEmpty, IsNumber } from "class-validator";
import { DurationType } from "src/db/entities/plan.entity";

export default class user {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    durationType: DurationType;
}