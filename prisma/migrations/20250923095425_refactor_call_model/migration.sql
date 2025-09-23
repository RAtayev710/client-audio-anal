/*
  Warnings:

  - A unique constraint covering the columns `[call_id]` on the table `calls` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "calls" ADD COLUMN     "transcribation_file_path" TEXT;

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "name" SET DEFAULT '{}'::jsonb,
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
CREATE UNIQUE INDEX "calls_call_id_key" ON "calls"("call_id");
