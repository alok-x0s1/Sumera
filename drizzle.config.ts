import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL as string;

export default defineConfig({
	schema: "./utils/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: dbUrl,
	},
	verbose: true,
	strict: true,
});
