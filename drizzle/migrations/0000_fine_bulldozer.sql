DO $$ BEGIN
 CREATE TYPE "public"."provider" AS ENUM('linkedin', 'twitter', 'google');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"provider" "provider" NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"account_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"account_used" boolean DEFAULT false,
	"display_name" text NOT NULL,
	"handle_name" text,
	"email" text,
	"image_url" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3),
	CONSTRAINT "account_provider_provider_id_pk" PRIMARY KEY("provider","provider_id"),
	CONSTRAINT "account_account_id_unique" UNIQUE("account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"article_id" text NOT NULL,
	"comment_id" serial NOT NULL,
	"account_id" uuid NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_account_id_account_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("account_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
