import { MigrationInterface, QueryRunner } from "typeorm";

export class Subscription1701267043639 implements MigrationInterface {
    name = 'Subscription1701267043639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "createdTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userIdId" integer, "planIdId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_76f954b0122c58a298dc4f4d9d6" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_7d17d5f3a8d6099107a1b638630" FOREIGN KEY ("planIdId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_7d17d5f3a8d6099107a1b638630"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_76f954b0122c58a298dc4f4d9d6"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
    }

}
