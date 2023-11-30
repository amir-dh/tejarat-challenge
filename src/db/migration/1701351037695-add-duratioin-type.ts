import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDuratioinType1701351037695 implements MigrationInterface {
    name = 'AddDuratioinType1701351037695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."plan_durationtype_enum" AS ENUM('year', 'month', 'week', 'day')`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "durationType" "public"."plan_durationtype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "duration" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "duration" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "durationType"`);
        await queryRunner.query(`DROP TYPE "public"."plan_durationtype_enum"`);
    }

}
