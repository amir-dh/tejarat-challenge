import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSubscriptionAndPlan1701350293043 implements MigrationInterface {
    name = 'UpdateSubscriptionAndPlan1701350293043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan" ADD "duration" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."subscription_status_enum" AS ENUM('incomplete', 'complete', 'expired')`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "status" "public"."subscription_status_enum" NOT NULL DEFAULT 'incomplete'`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "from" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD "to" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "duration"`);
    }

}
