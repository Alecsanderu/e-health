import { MigrationInterface, QueryRunner } from 'typeorm';

export class CheckInCheckOutDatesNullable1639818286739 implements MigrationInterface {
    name = 'CheckInCheckOutDatesNullable1639818286739';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `ALTER TABLE "departments" DROP CONSTRAINT "FK_dddc9634d319b4d5926b3a1173f"` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_in_date" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_out_date" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_in_date" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_out_date" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "departments"
            ADD CONSTRAINT "FK_dddc9634d319b4d5926b3a1173f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE` );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `ALTER TABLE "departments" DROP CONSTRAINT "FK_dddc9634d319b4d5926b3a1173f"` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_out_date" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_in_date" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_out_date" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "check_in_date" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "departments"
            ADD CONSTRAINT "FK_dddc9634d319b4d5926b3a1173f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE` );
    }

}
