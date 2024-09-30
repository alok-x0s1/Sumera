import {
	pgTable,
	serial,
	varchar,
	timestamp,
	integer,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	amount: integer("amount").notNull(),
	icon: varchar("icon"),
	createdBy: varchar("createdBy").notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});

export const Expenses = pgTable("expenses", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	amount: integer("amount").notNull().default(0),
	budgetId: integer("budgetId").references(() => Budgets.id),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});
