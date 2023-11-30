import { MigrationInterface, QueryRunner } from "typeorm";

export class Subscription1701347119753 implements MigrationInterface {
    name = 'Subscription1701347119753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "planId" integer NOT NULL, "createdTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscription"`);
    }

}
