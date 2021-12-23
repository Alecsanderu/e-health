import { MigrationInterface, QueryRunner } from 'typeorm';

export class HospitalMgmtDeptId1639770541282 implements MigrationInterface {
    name = 'HospitalMgmtDeptId1639770541282';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `ALTER TABLE "doctors" DROP CONSTRAINT "FK_84591f075d9d4c3908a9de0d32d"` );
        await queryRunner.query( `ALTER TABLE "patients" DROP CONSTRAINT "FK_418adf10b31a1fedbe8e406fc05"` );
        await queryRunner.query( `ALTER TABLE "doctors" RENAME COLUMN "departmentId" TO "department_id"` );
        await queryRunner.query( `ALTER TABLE "patients" RENAME COLUMN "departmentId" TO "department_id"` );
        await queryRunner.query( `ALTER TABLE "doctors"
            ALTER COLUMN "department_id" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "department_id" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "doctors"
            ALTER COLUMN "department_id" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "department_id" SET NOT NULL` );
        await queryRunner.query( `ALTER TABLE "doctors"
            ADD CONSTRAINT "FK_3672b55bcb332e54bc8d8cda1c1" FOREIGN KEY ("department_id") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE` );
        await queryRunner.query( `ALTER TABLE "patients"
            ADD CONSTRAINT "FK_c28f82660afab36707a23401c61" FOREIGN KEY ("department_id") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE` );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `ALTER TABLE "patients" DROP CONSTRAINT "FK_c28f82660afab36707a23401c61"` );
        await queryRunner.query( `ALTER TABLE "doctors" DROP CONSTRAINT "FK_3672b55bcb332e54bc8d8cda1c1"` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "department_id" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "doctors"
            ALTER COLUMN "department_id" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients"
            ALTER COLUMN "department_id" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "doctors"
            ALTER COLUMN "department_id" DROP NOT NULL` );
        await queryRunner.query( `ALTER TABLE "patients" RENAME COLUMN "department_id" TO "departmentId"` );
        await queryRunner.query( `ALTER TABLE "doctors" RENAME COLUMN "department_id" TO "departmentId"` );
        await queryRunner.query( `ALTER TABLE "patients"
            ADD CONSTRAINT "FK_418adf10b31a1fedbe8e406fc05" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE` );
        await queryRunner.query( `ALTER TABLE "doctors"
            ADD CONSTRAINT "FK_84591f075d9d4c3908a9de0d32d" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE` );
    }

}
