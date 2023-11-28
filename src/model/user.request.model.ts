import { IsEmail, IsNotEmpty, Length } from "class-validator";

export default class user {

    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @Length(4, 10)
    password: string;
}