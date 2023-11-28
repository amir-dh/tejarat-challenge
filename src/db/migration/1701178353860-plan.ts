import { MigrationInterface, QueryRunner } from "typeorm";

export class Plan1701178353860 implements MigrationInterface {
    name = 'Plan1701178353860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plan" ("id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, "price" integer NOT NULL, "createdTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "plan"`);
    }

}
