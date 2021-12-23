import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1639757688747 implements MigrationInterface {
    name = 'Users1639757688747';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `CREATE TABLE "users"
                                  (
                                      "id"         uuid                     NOT NULL,
                                      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                      "updated_at" TIMESTAMP WITH TIME ZONE,
                                      "email"      character varying        NOT NULL,
                                      "password"   character varying        NOT NULL,
                                      "name"       character varying        NOT NULL,
                                      "phone"      character varying        NOT NULL,
                                      "address"    character varying        NOT NULL,
                                      CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                                      CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                                  )` );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( `DROP TABLE "users"` );
    }

}
