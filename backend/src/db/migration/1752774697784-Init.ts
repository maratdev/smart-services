import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1752774697784 implements MigrationInterface {
    name = 'Init1752774697784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('product');

        if (!tableExists) {
            await queryRunner.query(`
                CREATE TABLE "product" (
                   "id" SERIAL NOT NULL,
                   "article" character varying,
                   "name" character varying NOT NULL DEFAULT 'default name',
                   "price" double precision NOT NULL,
                   "quantity" integer NOT NULL,
                   "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                   "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                   CONSTRAINT "PK_product_id" PRIMARY KEY ("id"),
                   CONSTRAINT "UQ_product_article" UNIQUE ("article")
                );
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('product');

        if (tableExists) {
            await queryRunner.query(`DROP TABLE "product"`);
        }
    }
}
