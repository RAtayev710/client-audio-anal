/*
  Warnings:

  - A unique constraint covering the columns `[org_id,phoneNumber]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `org_id` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "org_id" INTEGER NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "name" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "sex" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "age" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "job_title" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "place_of_work" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "having_children" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "place_of_residence" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "hobbies" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "marital_status" SET DEFAULT '{}'::jsonb,
ALTER COLUMN "sphere_of_activity" SET DEFAULT '{}'::jsonb;

-- CreateIndex
CREATE UNIQUE INDEX "clients_org_id_phoneNumber_key" ON "clients"("org_id", "phoneNumber");
