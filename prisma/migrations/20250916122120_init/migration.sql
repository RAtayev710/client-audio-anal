-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "sex" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "age" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "job_title" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "place_of_work" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "having_children" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "place_of_residence" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "hobbies" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "marital_status" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "sphere_of_activity" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_relatives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "placeOfWork" TEXT NOT NULL,
    "degree_of_kinship" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_relatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calls" (
    "id" TEXT NOT NULL,
    "call_id" INTEGER NOT NULL,
    "org_id" INTEGER NOT NULL,
    "client_phone" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "direction" TEXT NOT NULL,
    "manager_phone" TEXT,
    "manager_name" TEXT,
    "essence" TEXT,
    "initiator_of_topics" TEXT,
    "identified_problem" TEXT,
    "conversation_driver" TEXT,
    "problem_resolution_status" TEXT,
    "next_contact_date" TEXT,
    "client_interest" TEXT,
    "manager_task" TEXT,

    CONSTRAINT "calls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_client_infos" (
    "id" TEXT NOT NULL,
    "call_id" TEXT NOT NULL,
    "name" TEXT,
    "sex" TEXT,
    "age" TEXT,
    "job_title" TEXT,
    "place_of_work" TEXT,
    "having_children" TEXT,
    "place_of_residence" TEXT,
    "hobbies" TEXT,
    "marital_status" TEXT,
    "sphere_of_activity" TEXT,
    "age_assessment_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "call_client_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_client_relative_infos" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "name" TEXT,
    "age" TEXT,
    "place_of_work" TEXT,
    "degree_of_kinship" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "call_client_relative_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_satisfaction_infos" (
    "id" TEXT NOT NULL,
    "call_id" TEXT NOT NULL,
    "recommendations" TEXT[],
    "initial_rating_score" TEXT NOT NULL,
    "initial_rating_reason" TEXT NOT NULL,
    "final_rating_score" TEXT NOT NULL,
    "final_rating_reason" TEXT NOT NULL,
    "comparison" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "call_satisfaction_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_client_insights_infos" (
    "id" TEXT NOT NULL,
    "call_id" TEXT NOT NULL,
    "pain_categories" TEXT[],
    "pain_mentions" INTEGER NOT NULL,
    "pain_intensity" INTEGER NOT NULL,
    "interests_categories" TEXT[],
    "interests_mentions" INTEGER NOT NULL,
    "interests_intensity" INTEGER NOT NULL,
    "needs_categories" TEXT[],
    "needs_mentions" INTEGER NOT NULL,
    "needs_intensity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "call_client_insights_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_tokens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "orgs" INTEGER[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "calls_call_id_idx" ON "calls"("call_id");

-- CreateIndex
CREATE INDEX "calls_client_phone_idx" ON "calls"("client_phone");

-- CreateIndex
CREATE INDEX "calls_org_id_idx" ON "calls"("org_id");

-- CreateIndex
CREATE INDEX "calls_org_id_client_phone_idx" ON "calls"("org_id", "client_phone");

-- CreateIndex
CREATE UNIQUE INDEX "call_client_infos_call_id_key" ON "call_client_infos"("call_id");

-- CreateIndex
CREATE UNIQUE INDEX "call_client_relative_infos_client_id_key" ON "call_client_relative_infos"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "call_satisfaction_infos_call_id_key" ON "call_satisfaction_infos"("call_id");

-- CreateIndex
CREATE UNIQUE INDEX "call_client_insights_infos_call_id_key" ON "call_client_insights_infos"("call_id");

-- AddForeignKey
ALTER TABLE "client_relatives" ADD CONSTRAINT "client_relatives_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_client_infos" ADD CONSTRAINT "call_client_infos_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "calls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_client_relative_infos" ADD CONSTRAINT "call_client_relative_infos_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "call_client_infos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_satisfaction_infos" ADD CONSTRAINT "call_satisfaction_infos_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "calls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_client_insights_infos" ADD CONSTRAINT "call_client_insights_infos_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "calls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
