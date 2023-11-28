import { IsNotEmpty, IsNumber } from "class-validator";

export default class user {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;
}