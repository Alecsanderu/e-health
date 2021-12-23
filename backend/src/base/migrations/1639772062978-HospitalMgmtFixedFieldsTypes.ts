import { MigrationInterface, QueryRunner } from 'typeorm';

export class HospitalMgmtFixedFieldsTypes1639772062978 implements MigrationInterface {
    name = 'HospitalMgmtFixedFieldsTypes1639772062978';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `ALTER TABLE "patients" DROP COLUMN "diagnostic"` );
        await queryRunner.query( `ALTER TABLE "patients"
            ADD "diagnostic" character varying NOT NULL` );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `ALTER TABLE "patients" DROP COLUMN "diagnostic"` );
        await queryRunner.query( `ALTER TABLE "patients"
            ADD "diagnostic" date NOT NULL` );
    }

}
