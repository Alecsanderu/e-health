import { MigrationInterface, QueryRunner } from 'typeorm';

export class HospitalMgmt1639768960563 implements MigrationInterface {
    name = 'HospitalMgmt1639768960563';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `CREATE TYPE "public"."week_day_enum" AS ENUM('mo', 'tu', 'we', 'th', 'fr', 'sa', 'su')` );
        await queryRunner.query( `CREATE TYPE "public"."work_shift_enum" AS ENUM('day', 'night')` );
        await queryRunner.query( `CREATE TABLE "doctors"
                                  (
                                      "id"            uuid                       NOT NULL,
                                      "created_at"    TIMESTAMP WITH TIME ZONE   NOT NULL,
                                      "updated_at"    TIMESTAMP WITH TIME ZONE,
                                      "full_name"     character varying          NOT NULL,
                                      "qualification" character varying          NOT NULL,
                                      "phone"         character varying          NOT NULL,
                                      "working_days"  "public"."week_day_enum" array NOT NULL,
                                      "working_hours" "public"."work_shift_enum" NOT NULL,
                                      "departmentId"  uuid,
                                      CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id")
                                  )` );
        await queryRunner.query( `CREATE TYPE "public"."gender_enum" AS ENUM('male', 'female', 'unknown')` );
        await queryRunner.query( `CREATE TABLE "patients"
                                  (
                                      "id"                uuid                     NOT NULL,
                                      "created_at"        TIMESTAMP WITH TIME ZONE NOT NULL,
                                      "updated_at"        TIMESTAMP WITH TIME ZONE,
                                      "full_name"         character varying        NOT NULL,
                                      "address"           character varying        NOT NULL,
                                      "contact"           character varying        NOT NULL,
                                      "emergency_contact" character varying,
                                      "dob"               date                     NOT NULL,
                                      "gender"            "public"."gender_enum"   NOT NULL,
                                      "diagnostic"        date                     NOT NULL,
                                      "check_in_date"     date                     NOT NULL,
                                      "check_out_date"    date                     NOT NULL,
                                      "departmentId"      uuid,
                                      CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id")
                                  )` );
        await queryRunner.query( `CREATE TABLE "departments"
                                  (
                                      "id"         uuid                     NOT NULL,
                                      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                      "updated_at" TIMESTAMP WITH TIME ZONE,
                                      "name"       character varying        NOT NULL,
                                      "capacity"   integer                  NOT NULL,
                                      "user_id"    uuid                     NOT NULL,
                                      CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id")
                                  )` );
        await queryRunner.query( `ALTER TABLE "doctors"
            ADD CONSTRAINT "FK_84591f075d9d4c3908a9de0d32d" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE` );
        await queryRunner.query( `ALTER TABLE "patients"
            ADD CONSTRAINT "FK_418adf10b31a1fedbe8e406fc05" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE` );
        await queryRunner.query( `ALTER TABLE "departments"
            ADD CONSTRAINT "FK_dddc9634d319b4d5926b3a1173f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE` );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `ALTER TABLE "departments" DROP CONSTRAINT "FK_dddc9634d319b4d5926b3a1173f"` );
        await queryRunner.query( `ALTER TABLE "patients" DROP CONSTRAINT "FK_418adf10b31a1fedbe8e406fc05"` );
        await queryRunner.query( `ALTER TABLE "doctors" DROP CONSTRAINT "FK_84591f075d9d4c3908a9de0d32d"` );
        await queryRunner.query( `DROP TABLE "departments"` );
        await queryRunner.query( `DROP TABLE "patients"` );
        await queryRunner.query( `DROP TYPE "public"."gender_enum"` );
        await queryRunner.query( `DROP TABLE "doctors"` );
        await queryRunner.query( `DROP TYPE "public"."work_shift_enum"` );
        await queryRunner.query( `DROP TYPE "public"."week_day_enum"` );
    }

}
