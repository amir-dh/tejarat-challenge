import { IsNotEmpty } from "class-validator";

export default class user {
    @IsNotEmpty()
    planId: number;
}