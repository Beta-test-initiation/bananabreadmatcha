import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1710000000000 implements MigrationInterface {
    name = 'InitialSchema1710000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum types
        await queryRunner.query(`CREATE TYPE "public"."food_items_type_enum" AS ENUM('perishable', 'non_perishable')`);
        await queryRunner.query(`CREATE TYPE "public"."deliveries_status_enum" AS ENUM('pending', 'in_progress', 'completed', 'cancelled')`);

        // Create donors table
        await queryRunner.query(`
            CREATE TABLE "donors" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "organizationName" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "address" character varying NOT NULL,
                "latitude" decimal(10,8) NOT NULL,
                "longitude" decimal(11,8) NOT NULL,
                "preferredPickupTimes" text[] NOT NULL DEFAULT '{}',
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_donors" PRIMARY KEY ("id")
            )
        `);

        // Create food_items table
        await queryRunner.query(`
            CREATE TABLE "food_items" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "type" "public"."food_items_type_enum" NOT NULL DEFAULT 'non_perishable',
                "quantity" decimal(10,2) NOT NULL,
                "unit" character varying NOT NULL,
                "description" text,
                "expiryDate" TIMESTAMP NOT NULL,
                "isAvailable" boolean NOT NULL DEFAULT true,
                "donor_id" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_food_items" PRIMARY KEY ("id"),
                CONSTRAINT "FK_food_items_donor" FOREIGN KEY ("donor_id") REFERENCES "donors"("id") ON DELETE CASCADE
            )
        `);

        // Create recipients table
        await queryRunner.query(`
            CREATE TABLE "recipients" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "organizationName" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "address" character varying NOT NULL,
                "latitude" decimal(10,8) NOT NULL,
                "longitude" decimal(11,8) NOT NULL,
                "dietaryRestrictions" text[] NOT NULL DEFAULT '{}',
                "preferredDeliveryTimes" text[] NOT NULL DEFAULT '{}',
                "storageCapacity" character varying NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_recipients" PRIMARY KEY ("id")
            )
        `);

        // Create deliveries table
        await queryRunner.query(`
            CREATE TABLE "deliveries" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "recipient_id" uuid NOT NULL,
                "food_item_id" uuid NOT NULL,
                "status" "public"."deliveries_status_enum" NOT NULL DEFAULT 'pending',
                "scheduledDeliveryTime" TIMESTAMP NOT NULL,
                "actualDeliveryTime" TIMESTAMP,
                "notes" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_deliveries" PRIMARY KEY ("id"),
                CONSTRAINT "FK_deliveries_recipient" FOREIGN KEY ("recipient_id") REFERENCES "recipients"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_deliveries_food_item" FOREIGN KEY ("food_item_id") REFERENCES "food_items"("id") ON DELETE CASCADE
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "IDX_donors_location" ON "donors" ("latitude", "longitude")`);
        await queryRunner.query(`CREATE INDEX "IDX_recipients_location" ON "recipients" ("latitude", "longitude")`);
        await queryRunner.query(`CREATE INDEX "IDX_food_items_donor" ON "food_items" ("donor_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_deliveries_recipient" ON "deliveries" ("recipient_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_deliveries_food_item" ON "deliveries" ("food_item_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_deliveries_status" ON "deliveries" ("status")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX "IDX_deliveries_status"`);
        await queryRunner.query(`DROP INDEX "IDX_deliveries_food_item"`);
        await queryRunner.query(`DROP INDEX "IDX_deliveries_recipient"`);
        await queryRunner.query(`DROP INDEX "IDX_food_items_donor"`);
        await queryRunner.query(`DROP INDEX "IDX_recipients_location"`);
        await queryRunner.query(`DROP INDEX "IDX_donors_location"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TABLE "recipients"`);
        await queryRunner.query(`DROP TABLE "food_items"`);
        await queryRunner.query(`DROP TABLE "donors"`);

        // Drop enum types
        await queryRunner.query(`DROP TYPE "public"."deliveries_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."food_items_type_enum"`);
    }
} 