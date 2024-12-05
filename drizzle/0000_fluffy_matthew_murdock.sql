-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bascket" (
	"bascket_id" serial PRIMARY KEY NOT NULL,
	"article_id" integer,
	"quantity" double precision,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "articles" (
	"article_id" serial PRIMARY KEY NOT NULL,
	"description" varchar(255),
	"price" numeric,
	"name" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"article_id" integer,
	"description" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bascket" ADD CONSTRAINT "bascket_users_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bascket" ADD CONSTRAINT "bascket_articles_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("article_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_users_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_articles_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("article_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/